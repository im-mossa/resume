import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { World, Body, Box, Sphere, Vec3, Material, ContactMaterial, Plane } from 'cannon-es';

// صحنه و دوربین 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// Cannon-es جهان فیزیکی 
const world = new World();
world.gravity.set(0, -9.82, 0);

// Three.js توپ در
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

// Cannon-es توپ در 
const ballBody = new Body({
    mass: 5,
    shape: new Sphere(0.5),
    position: new Vec3(0, 5, 9),
});
world.addBody(ballBody);

//ایجاد دیوار آجری. دیوار آجری از تعداد زیادی مکعب کوچک ساخته می شود
const brickWidth = 1;
const brickHeight = 0.5;
const brickDepth = 1;
const bricks = []; // آرایه ای برای ذخیره آجری ها
const brickMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 10; col++) {
        // موقعیت آجرها
        const x = col * (brickWidth + 0.1) - 5; //تنظیم عرض 
        const y = row * (brickHeight + 0.1) + 1; // تنظیم ارتفاع 
        const z = 0;
        // Three.js آجر در 
        const brickGeometry = new THREE.BoxGeometry(brickWidth, brickHeight, brickDepth);
        const brickMesh = new THREE.Mesh(brickGeometry, brickMaterial);
        brickMesh.position.set(x, y, z);
        scene.add(brickMesh);
        // Cannon-es آجر در
        const brickBody = new Body({
            mass: 1,
            shape: new Box(new Vec3(brickWidth / 2, brickHeight / 2, brickDepth / 2)),
            position: new Vec3(x, y, z),
        });
        world.addBody(brickBody);
        // ذخیره سازی
        bricks.push({ mesh: brickMesh, body: brickBody });
    }
}

// تعریف متریال فیزیکی
const material = new Material();
const contactMaterial = new ContactMaterial(material, material, {
    friction: 0.5,
    restitution: 0.7,
});
world.addContactMaterial(contactMaterial);

// زمین فیزیکی
const groundBody = new Body({
    mass: 0, // ثابت
    shape: new Plane(),
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

//افزودن نورپردازی
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// پرتاب توپ
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        ballBody.applyForce(new Vec3(0, 0, -1000), ballBody.position);
    }
});

// Three.js و Cannon-es هماهنگی بین
function animate() {
    requestAnimationFrame(animate);
    // Cannon-es به روزرسانی
    world.step(1 / 60);
    // هماهنگی توپ 
    ballMesh.position.copy(ballBody.position);
    ballMesh.quaternion.copy(ballBody.quaternion);
    // هماهنگی دیوار آجری 
    bricks.forEach(({ mesh, body }) => {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    });
    // رندر صحنه 
    renderer.render(scene, camera);
}
animate();