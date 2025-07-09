import * as THREE from 'three';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(3, 10, 5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.add(ambientLight, dirLight);

// ایجاد هندسه برای پارتیکل ها . 1
const particles = new THREE.BufferGeometry();
const particleCount = 1000; //تعداد ذرات
const positions = new Float32Array(particleCount * 3); //هر ذره سه مختصات دارد
// پر کردن هندسه با مختصات تصادفی
for (let i = 0; i < particleCount; i++) {
positions[i * 3] = Math.random() * 100 - 50; //موقعیت ایکس
positions[i * 3 + 1] = Math.random() * 100 - 50; //موقعیت y
positions[i * 3 + 2] = Math.random() * 100 - 50 //موقعیت Z
}
particles.setAttribute('position', new THREE.BufferAttribute(positions,
3));
// ایجاد متریال پارتیکل ها . 2
const material = new THREE.PointsMaterial({
color: 0x888888,  //رنگ خاکی 
size: 0.5,  //اندازه ذرات 
transparent: true,  // شفافیت
opacity: 0.8,  //میزان شفافیت
});
// 3. ایجاد پارتیکال سیستم
const particleSystem = new THREE.Points(particles, material);
// افزودن پارتیکل سیستم به صحنه . 4
scene.add(particleSystem);
// ایجاد انیمیشن حرکت دادن ذرات . 5 
function animateParticles() {
const positions = particleSystem.geometry.attributes.position.array;
for (let i = 0; i < positions.length; i += 3) {
positions[i + 1] -= 0.1;  //سقوط ذرات به پایین
if (positions[i + 1] < -50) {
positions[i + 1] = 50;  //بازنشانی موقعیت ایگرگ در صورت خروج از صحنه
}
}
particleSystem.geometry.attributes.position.needsUpdate = true; //به روز رسانی موقعیت ها
}
// فراخوانی انیمیشن در هر فریم
function animate() {
requestAnimationFrame(animate);
animateParticles(); // حرکت دادن ذرات
renderer.render(scene, camera);
}
animate();