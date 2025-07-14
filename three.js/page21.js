import * as THREE from 'three';

// یک رندرر روی یک کانواس
const canvas = document.getElementById('mainCanvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setScissorTest(true);

// ایجاد صحنه ها
const scene1 = new THREE.Scene();
scene1.background = new THREE.Color(0xff0000);
const scene2 = new THREE.Scene();
scene2.background = new THREE.Color(0x00aa00);
const scene3 = new THREE.Scene();
scene3.background = new THREE.Color(0x0000ff);
// ایجاد دوربین ها
const camera1 = new THREE.PerspectiveCamera(75, canvas.width /
    canvas.height, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, canvas.width /
    canvas.height, 0.1, 1000);
const camera3 = new THREE.PerspectiveCamera(75, canvas.width /
    canvas.height, 0.1, 1000);
// تنظیم موقعیت دوربین ها
camera1.position.z = 5;
camera2.position.x = 5;
camera2.lookAt(0, 0, 0);
camera3.position.y = 5;
camera3.lookAt(0, 0, 0);

// ——— Light1 ———
const al1 = new THREE.AmbientLight(0xffffff, 0.5);
const dl1 = new THREE.DirectionalLight(0xffffff, 1);
dl1.position.set(5, 5, 5);
scene1.add(dl1, al1);
// ——— Light2 ———
const al2 = new THREE.AmbientLight(0xffffff, 0.5);
const dl2 = new THREE.DirectionalLight(0xffffff, 1);
dl2.position.set(5, 5, 5);
scene2.add(dl2, al2);
// ——— Light3 ———
const al3 = new THREE.AmbientLight(0xffffff, 0.5);
const dl3 = new THREE.DirectionalLight(0xffffff, 1);
dl3.position.set(5, 5, 5);
scene3.add(dl3, al3);


// ۱) هندسه‌ها و متریال
const geoA = new THREE.ConeGeometry(1,2,32);
const geoB = new THREE.IcosahedronGeometry(1.5,0);
const geoC = new THREE.TorusKnotGeometry(1,0.4);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

// ۲) سه Mesh جدا
const meshA = new THREE.Mesh(geoA, material);
const meshB = new THREE.Mesh(geoB, material);
const meshC = new THREE.Mesh(geoC, material);

// ۳) افزودن به صحنه‌ها
scene1.add(meshA);
scene2.add(meshB);
scene3.add(meshC);

function animate() {
    requestAnimationFrame(animate);
    // چرخاندن مکعب ها
    meshA.rotation.x += 0.01;
    meshA.rotation.y += 0.01;
    meshB.rotation.x += 0.01;
    meshB.rotation.y += 0.01;
    meshC.rotation.x += 0.01;
    meshC.rotation.y += 0.01;
    // رندر کردن صحنه ها با دوربین های مختلف
    const w = window.innerWidth;
    const h = window.innerHeight;
    const thirdW = Math.floor(w / 3);

    // صحنه اول در سوم سمت چپ
    renderer.setViewport(0, 0, thirdW, h);
    renderer.setScissor(0, 0, thirdW, h);
    renderer.render(scene1, camera1);

    // صحنه دوم در وسط
    renderer.setViewport(thirdW, 0, thirdW, h);
    renderer.setScissor(thirdW, 0, thirdW, h);
    renderer.render(scene2, camera2);

    // صحنه سوم در سمت راست
    renderer.setViewport(2 * thirdW, 0, thirdW, h);
    renderer.setScissor(2 * thirdW, 0, thirdW, h);
    renderer.render(scene3, camera3);
}
// شروع انیمیشن
animate();

// ——— Resize Handler ———
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
    camera3.aspect = window.innerWidth / window.innerHeight;
    camera3.updateProjectionMatrix();
});