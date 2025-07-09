import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

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

// زمین
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// مکعب‌ها
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x3333ff })
);
cube1.position.set(3, 0.5, -2);
scene.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0xff3333 })
);
cube2.position.set(3, 0.5, 2);
scene.add(cube2);

// کامپوزر و پاس‌ها
const composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);

// 1) پاس رندر اصلی
composer.addPass(new RenderPass(scene, camera));

// 2) پاس عمق میدان
const focusDist = camera.position.distanceTo(cube2.position);
const bokehPass = new BokehPass(scene, camera, {
    focus: focusDist,
    aperture: 0.000025,
    maxblur: 0.01
});
composer.addPass(bokehPass);

// 3) پاس AA (SMAA)
const smaaPass = new SMAAPass();
composer.addPass(smaaPass);

// فقط آخرین پاس باید روی صفحه renderToScreen باشد
smaaPass.renderToScreen = true;

// حلقه انیمیشن
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // در صورت حرکت دوربین، فاصله فوکوس را به‌روز کنید
    bokehPass.materialBokeh.uniforms.focus.value =
        camera.position.distanceTo(cube2.position);

    composer.render();
}
animate();

// هندل ریسایز
window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
    composer.setSize(w, h);
});
