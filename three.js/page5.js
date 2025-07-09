import * as THREE from 'three';

// 1. صحنه و دوربین و رندرر
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcb0909);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

console.log("webgl:" + !!window.WebGLRenderingContext); //برای اینکه بفهمیم که از وب جی ال پشتیبانی میکند یانه

// 3. سیستم ذرات
const fireParticles = new THREE.BufferGeometry();
const count = 1000;
const firePositions = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
    firePositions[i * 3] = Math.random() * 10 - 5;      // X
    firePositions[i * 3 + 1] = Math.random() * 10 - 5;  // Y
    firePositions[i * 3 + 2] = Math.random() * 10 - 5;  // Z
}

fireParticles.setAttribute(
    'position',
    new THREE.BufferAttribute(firePositions, 3)
);

//4. بارگذاری بافت و ساخت متریال و افزودن به صحنه
const fireMaterial = new THREE.PointsMaterial({
    color: 0xff6600,
    size: 0.5,
    transparent: true,
    opacity: 1,
    map: new THREE.TextureLoader().load('/fire-texture.png'),
    alphaTest: 0.5,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
});
const fireParticleSystem = new THREE.Points(fireParticles, fireMaterial);
scene.add(fireParticleSystem);
// فقط یک‌بار تعریف برای بهینه‌سازی
const positions = fireParticleSystem.geometry.attributes.position.array;
function animateFire() {
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.05; // حرکت Y به بالا
        if (positions[i + 1] > 5) {
            positions[i + 1] = -5; // بازنشانی موقعیت Y
        }
    }
    fireParticleSystem.geometry.attributes.position.needsUpdate = true;
}
function animate() {
    requestAnimationFrame(animate);
    animateFire();
    renderer.render(scene, camera);
}

animate(); // شروع انیمیشن بعد از لود کامل تکسچر

// 5. واکنش به تغییر اندازه پنجره
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
