import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeBufferGeometriesSimple } from './src/utils/mergeGeometries';

// ——— راه‌اندازی Renderer ———
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// ——— صحنه و دوربین ———
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// ——— کنترل‌ها ———
const controls = new OrbitControls(camera, renderer.domElement);

// ——— نورپردازی ———
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// ——— ساخت و جابجایی چند Geometry ———
const geometries = [];

// ۵ مکعب
for (let i = 0; i < 5; i++) {
    const box = new THREE.BoxGeometry(1, 1, 1);
    box.translate(i * 2 - 4, 0, 0);
    geometries.push(box);
}

// ۵ کره
for (let i = 0; i < 5; i++) {
    const sphere = new THREE.SphereGeometry(0.6, 16, 16);
    sphere.translate(i * 2 - 4, 2, 0);
    geometries.push(sphere);
}

// ——— ادغام Geometries در یک Geometry ———
const mergedGeometry = mergeBufferGeometriesSimple(geometries, false);


// ——— ایجاد Mesh با Geometry ادغام‌شده ———
const material = new THREE.MeshStandardMaterial({ color: 0x3366ff });
// در این کد از تکنیک Shared Materials هم استفاده شده
// چون چندین جسم از یک متریال مشترک استفاده کردند
const mesh = new THREE.Mesh(mergedGeometry, material);
scene.add(mesh);

// ——— حلقهٔ انیمیشن ———
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// ——— واکنش به تغییر اندازه ———
window.addEventListener('resize', () => {
    const w = innerWidth, h = innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});
