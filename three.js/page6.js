import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// صحنه و دوربین و رندرر
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcb0909);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// دنیای فیزیکی
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.SAPBroadphase(world);
world.solver = new CANNON.GSSolver();

// تعریف متریال فیزیکی
const material = new CANNON.Material();
const contactMaterial = new CANNON.ContactMaterial(material, material, {
    friction: 0.5,
    restitution: 0.7,
});
world.addContactMaterial(contactMaterial);

// توپ فیزیکی
const radius = 1;
const ballShape = new CANNON.Sphere(radius);
const ballBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 5, 0),
    material: material,
});
ballBody.addShape(ballShape);
// استفاده از velocity و force 
const velocity = ballBody.velocity;
world.addBody(ballBody);

// توپ گرافیکی
const ballGeometry = new THREE.SphereGeometry(radius, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// زمین فیزیکی
const groundBody = new CANNON.Body({
    mass: 0, // ثابت
    shape: new CANNON.Plane(),
    material: material,
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// زمین گرافیکی
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x00aa00,
    side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);

// نور
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light, ambientLight);

document.addEventListener('keydown', (event) => {
if (event.code === 'Space') {
//اعمال نیرو به توپ 
ballBody.applyForce(new CANNON.Vec3(0, 500, 0), ballBody.position);
}
});

// انیمیشن
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    ball.position.copy(ballBody.position);
    ball.quaternion.copy(ballBody.quaternion);
    ball.userData.velocity = velocity;

    renderer.render(scene, camera);
}
animate();

