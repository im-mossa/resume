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
camera.position.set(2.5, 5, 5);
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
    uniforms: {
        u_time: { value: 0.0 },
    },
    vertexShader: `
    uniform float u_time;
    varying vec3 vPosition;

    void main() {
      vPosition = position;

      vec3 newPosition = position;
      newPosition.x += sin(u_time + position.y) * 0.2;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
    fragmentShader: `
    uniform float u_time;
    varying vec3 vPosition;

    void main() {
      float r = abs(sin(u_time + vPosition.x));
      float g = abs(cos(u_time + vPosition.y));
      float b = abs(sin(u_time + vPosition.z));
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// حلقه انیمیشن
function animate(time) {
  requestAnimationFrame(animate);
  controls.update();

  // time این‌جا مقدار میلی‌ثانیه‌ی گذشته از شروع صفحه‌است
  material.uniforms.u_time.value = time * 0.001;  // به ثانیه تبدیل می‌شود

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