import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// صحنه و دوربین
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(10, 15, 15);
camera.lookAt(0, 0, 0);

// رندرر
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// کنترل
const controls = new OrbitControls(camera, renderer.domElement);

// نورپردازی
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.ShaderMaterial({
vertexShader: `
void main() {
gl_Position = projectionMatrix * modelViewMatrix *
vec4(position, 1.0);
}
`,
fragmentShader: `
void main() {
  // به صورت RGBA: قرمز، سبز، آبی، آلفا
  gl_FragColor = vec4(0.2, 0.6, 0.8, 1.0);
}
`,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// حلقه انیمیشن
function animate() {
requestAnimationFrame(animate);
controls.update();
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
renderer.render(scene, camera);
}
animate();

// هندل ریسایز
window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});
