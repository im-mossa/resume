import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ——— راه‌اندازی Renderer ———
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// ——— صحنه و دوربین ———
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(2.5, 5, 5);
camera.lookAt(0, 0, 0);

// ——— کنترل‌ها ———
const controls = new OrbitControls(camera, renderer.domElement);

// ——— نورپردازی ———
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// ——— مکعب‌ها به صورت InstancedMesh ———
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// در این کد از تکنیک Shared Materials هم استفاده شده
// چون چندین جسم از یک متریال مشترک استفاده کردند
const cube = new THREE.InstancedMesh(geometry, material, 10);
cube.frustumCulled = false;  // غیرفعال کردن culling

// تعیین ماتریس هر نمونه
const dummy = new THREE.Object3D();
for (let i = 0; i < 10; i++) {
  dummy.position.set((i - 4.5) * 1.5, 0, 0);
  dummy.updateMatrix();
  cube.setMatrixAt(i, dummy.matrix);
}
cube.instanceMatrix.needsUpdate = true;

scene.add(cube);

// ——— حلقه‌ی انیمیشن ———
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // چرخش کل InstancedMesh
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

// ——— واکنش به تغییر اندازه صفحه ———
window.addEventListener('resize', () => {
  const w = innerWidth, h = innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
