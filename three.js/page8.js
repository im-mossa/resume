import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
    World,
    Body,
    Box,
    Vec3,
    RaycastVehicle,
    Plane,
    Material,
    ContactMaterial
} from 'cannon-es';

// تنظیم صحنه
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// تنظیم جهان فیزیکی
const world = new World();
world.gravity.set(0, -9.82, 0);

// تعریف متریال برخورد
const groundMaterial = new Material();
const groundContact = new ContactMaterial(groundMaterial, groundMaterial, {
    friction: 0.6,
    restitution: 0.3
});
world.addContactMaterial(groundContact);

// ساخت زمین فیزیکی
const groundBody = new Body({ mass: 0, material: groundMaterial, shape: new Plane() });
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// مش سه‌بعدی زمین
const groundGeo = new THREE.PlaneGeometry(100, 100);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);

// نور
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// بدنه ماشین
const carBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const carBodyMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 4), carBodyMaterial);
scene.add(carBodyMesh);
const carBody = new Body({ mass: 150, position: new Vec3(0, 1.5, 0), shape: new Box(new Vec3(1, 0.25, 2)) });
world.addBody(carBody);

// چرخ‌ها گرافیکی
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
const wheels = [];
const wheelOffsetQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);
for (let i = 0; i < 4; i++) {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.quaternion.copy(wheelOffsetQuat);
    scene.add(w);
    wheels.push(w);
}

// تعریف وسیله نقلیه
const vehicle = new RaycastVehicle({ chassisBody: carBody, indexRightAxis: 0, indexUpAxis: 1, indexForwardAxis: 2 });
const wheelPositions = [new Vec3(-1, -0.3, 1.5), new Vec3(1, -0.3, 1.5), new Vec3(-1, -0.3, -1.5), new Vec3(1, -0.3, -1.5)];
wheelPositions.forEach((pos, i) => vehicle.addWheel({ chassisConnectionPointLocal: pos, isFrontWheel: i < 2, directionLocal: new Vec3(0, -1, 0), axleLocal: new Vec3(-1, 0, 0), suspensionStiffness: 30, suspensionRestLength: 0.5, frictionSlip: 5, dampingRelaxation: 2.3, dampingCompression: 4.4, maxSuspensionForce: 100000, rollInfluence: 0.01, maxSuspensionTravel: 0.3, customSlidingRotationalSpeed: -30, useCustomSlidingRotationalSpeed: true, radius: 0.4 }));
vehicle.addToWorld(world);

// کنترل با کیبورد
const maxSteerVal = 0.5;
const maxForce = 200;
const engineForce = 0;
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
document.addEventListener('keydown', e => { if (keys.hasOwnProperty(e.code)) keys[e.code] = true; });
document.addEventListener('keyup', e => { if (keys.hasOwnProperty(e.code)) keys[e.code] = false; });

// انیمیشن
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    // اعمال نیرو و فرمان
    let steer = 0;
    if (keys.ArrowLeft) steer = maxSteerVal;
    else if (keys.ArrowRight) steer = -maxSteerVal;
    vehicle.setSteeringValue(steer, 0);
    vehicle.setSteeringValue(steer, 1);

    let force = 0;
    if (keys.ArrowUp) force = -maxForce;
    else if (keys.ArrowDown) force = maxForce;
    vehicle.applyEngineForce(force, 2);
    vehicle.applyEngineForce(force, 3);

    // آپدیت گرافیک بدنه
    carBodyMesh.position.copy(carBody.position);
    carBodyMesh.quaternion.copy(carBody.quaternion);
    // آپدیت چرخ‌ها
    vehicle.wheelInfos.forEach((w, i) => {
        vehicle.updateWheelTransform(i);
        const t = w.worldTransform;
        wheels[i].position.copy(t.position);
        wheels[i].quaternion.copy(new THREE.Quaternion(t.quaternion.x, t.quaternion.y, t.quaternion.z, t.quaternion.w).multiply(wheelOffsetQuat));
    });

    renderer.render(scene, camera);
}
animate();
// نکته: چون در اینجا ما به محاسبه ی برخورد چرخ نیاز نداریم چرخ فیزیکی را حذف و اطلاعات موقعیت چرخ را مسقیما از ریکست ویکل به چرخ گرافیکی منتقل می کنیم تا کد هم پیچیده تر نشود