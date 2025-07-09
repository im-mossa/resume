import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ——— Renderer ———
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ——— Scene & Camera ———
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth/window.innerHeight, 0.1, 100
);
camera.position.set(0, 0, 30);

// ——— Controls ———
const controls = new OrbitControls(camera, renderer.domElement);

// ——— Light ———
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(5,5,5);
scene.add(dl);

// ——— ایجاد LOD ———
const lod = new THREE.LOD();
const material = new THREE.MeshStandardMaterial({ color: 0x3366ff });

// پرجزئیات
const geoHigh = new THREE.SphereGeometry(5, 32, 32);
const meshHigh = new THREE.Mesh(geoHigh, material);
lod.addLevel(meshHigh, 0);

// متوسط
const geoMid = new THREE.SphereGeometry(5, 16, 16);
const meshMid = new THREE.Mesh(geoMid, material);
lod.addLevel(meshMid, 30);

// کم‌جزئیات
const geoLow = new THREE.SphereGeometry(5, 8, 8);
const meshLow = new THREE.Mesh(geoLow, material);
lod.addLevel(meshLow, 60);

// اضافه کردن به صحنه
scene.add(lod);

// ——— Animate ———
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // هر فریم LOD را نسبت به دوربین آپدیت کن
  lod.update(camera);

  renderer.render(scene, camera);
}
animate();

// ——— Resize Handler ———
window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
