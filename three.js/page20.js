import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
// ——— Renderer ———
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ——— Scene & Camera ———
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 100
);
camera.position.set(0, 0, 30);

// ——— Controls ———
const controls = new OrbitControls(camera, renderer.domElement);

// ——— Light ———
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(5, 5, 5);
scene.add(dl);

// ——— mesh ———
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
let mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);

// نمونه استفاده از تکستچر فشرده در پایین
const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('/assets/basis/')  // مسیر صحیح به WASM
    .detectSupport(renderer);

ktx2Loader.load(
    './src/asset/cubemap_rgba8_linear.ktx2',
    texture => {
        const mat = new THREE.MeshStandardMaterial({ map: texture });
        const mesh2 = new THREE.Mesh(geometry, mat);
        scene.add(mesh2);
    },
    xhr => console.log(`بارگذاری: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`),
    err => console.error('خطا در بارگذاری KTX2:', err)
);


// وقتی دیگر نمی‌خواهیم از آن استفاده کنیم:
scene.remove(mesh1);
//چون مش2 در بلوک جنرال نیست دسترسی در سطح گلوبال بهش نداریم
//scene.remove(mesh2);
//geometry.dispose();   // ← آزادسازی هندسه
material.dispose();   // ← آزادسازی متریال
//mat.map.dispose();  // ← آزادسازی تکسچر
//فقط متد دیسپوز باعث آزادسازی در جی پی یو می‌شود؛
//اما برای پاک شدن کامل از رم و حافظه جاوااسکریپت، باید مرجع‌ها را هم قطع کنی

mesh1.geometry.dispose();
//mesh2.mat.dispose();
mesh1 = null; // اگر از let استفاده کرده‌ای



// ——— Animate ———
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ——— Resize Handler ———
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});