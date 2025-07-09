import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js';
import StatsGL from 'stats-gl';

// ——— راه‌اندازی Renderer ———
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// ——— صحنه و دوربین ———
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
);
camera.position.set(2.5, 5, 5);
camera.lookAt(0, 0, 0);

// ——— کنترل‌ها ———
const controls = new OrbitControls(camera, renderer.domElement);

// ——— نورپردازی ———
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// ——— مکعب و شیدر ———
const geometry = new THREE.BoxGeometry();
const material = new THREE.ShaderMaterial({
    uniforms: { u_time: { value: 0 } },
    vertexShader: `
    uniform float u_time;
    varying vec3 vPosition;
    void main() {
      vec3 np = position;
      np.z += sin(u_time + position.x * 5.) * 0.2;
      np.z += cos(u_time + position.y * 5.) * 0.2;
      vPosition = np;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(np, 1.0);
    }
  `,
    fragmentShader: `
    uniform float u_time;
    varying vec3 vPosition;
    void main() {
      float r = abs(sin(u_time + vPosition.x * 2.));
      float g = abs(cos(u_time + vPosition.y * 2.));
      float b = abs(sin(vPosition.z * 2.));
      gl_FragColor = vec4(r, g, b, 1.);
    }
  `
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ——— FPS با stats.js ———
const stats = new Stats();
stats.showPanel(2);
stats.dom.style.position = 'absolute';
stats.dom.style.left = '70%';
stats.dom.style.top = '10px';
stats.dom.style.transform = 'scale(2)';
stats.dom.style.transformOrigin = 'top left';
document.body.appendChild(stats.dom);

// ——— StatsGL ———
const statsGL = new StatsGL({ trackGPU: true });
statsGL.init(renderer.domElement);
statsGL.dom.style.position = 'absolute';
statsGL.dom.style.left = '70%';
statsGL.dom.style.top = '100px';
statsGL.dom.style.transform = 'scale(2)';
statsGL.dom.style.transformOrigin = 'top right';
document.body.appendChild(statsGL.dom);

// ——— حلقه‌ی انیمیشن ———
function animate(time) {
    stats.begin();
    material.uniforms.u_time.value = time * 0.001;
    controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    statsGL.begin();
    renderer.render(scene, camera);
    statsGL.end();
    statsGL.update();
    stats.end();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ——— واکنش به تغییر اندازه صفحه ———
window.addEventListener('resize', () => {
    const w = innerWidth, h = innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});
