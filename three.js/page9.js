import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// تنظیم صحنه
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 15, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// اجازه می‌ده چند بار render پشت سر هم بدون پاکسازی تمام بافر انجام بشه
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// نور
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
scene.add(new THREE.DirectionalLight(0xffffff, 1)).position.set(5, 10, 5);

// مش زمین
const groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide })
);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);

// مکعب عادی
const cubeNormal = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x3333ff })
);
cubeNormal.position.set(3, 0.5, 0);
scene.add(cubeNormal);

// مکعب درخشان
const cubeBloom = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xF4D35E, emissiveIntensity: 1 })
);
cubeBloom.position.set(-3, 0.5, 0);
scene.add(cubeBloom);

// متریال سیاه برای ماسک
const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const materials = new Map();

function darkenNonBloomed(obj) {
    if (obj.isMesh && obj !== cubeBloom) {
        materials.set(obj, obj.material);
        obj.material = darkMaterial;
    }
}

function restoreMaterial(obj) {
    if (materials.has(obj)) {
        obj.material = materials.get(obj);
        materials.delete(obj);
    }
}

// Composer برای bloom
const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(new RenderPass(scene, camera));
bloomComposer.addPass(
    new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), //size
        3.0, //strength
        1.0, //radius
        0.5 //threshold
    )
);

// تابع رندر
function render() {
    // پاکسازی کامل بافر
    renderer.clear();

    // 1. ماسک: غیر bloom را سیاه کن
    scene.traverse(darkenNonBloomed);
    // 2. رندر bloom
    bloomComposer.render();
    // 3. بازگردانی متریال‌ها
    scene.traverse(restoreMaterial);

    // 4. حالا صحنهٔ اصلی را بدون bloom رندر کن
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

animate();
