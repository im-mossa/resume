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

//شروع درس:
// بهینه سازی متریال: انتخاب مواد مناسب و تنظیم پارامترهای مواد
//بخش اول: انتخاب مواد مناسب
// برای اجسام  MeshLambertMaterial یا MeshBasicMaterial برای بهینه سازی عملکرد، توصیه می شود که از
//ساده یا زمانی که نیازی به جزئیات نورپردازی ندارید، استفاده کنید. اگر به واقع گرایی نیاز دارید، از
// استفاده کنید، اما مراقب تأثیر آن بر عملکرد باشید. MeshStandardMaterial
// بخش دوم: Normal Maps استفاده از نقشه های نرمال
// برای این کار در تری جی اس از تکستچر استفاده می کنند TextureLoader()
// بخش سوم: Tweaking Material Parameters تنظیم پارامترهای مواد
//تنظیم برخی پارامتر های مواد می تواند باعث کاهش رندرینگ و بهبود عملکرد شود:
// 1- Roughness میزان زبری
// 2- Metalness میزان فلزی بودن
// 3- Opacity میزان شفافیت
// بخش چهارم: برای مواد مشترک InstancedMesh استفاده از
// Compressed Textures استفاده از مواد فشرده
// یکی از روش های موثر برای بهینه سازی مواد استفاده از تکسچرهای فشرده است. حجم حافظه مصرفی را
//کاهش دهید و در عین حال کیفیت رندرینگ را حفظ کنید. برای این کار از فرمت KTX و DDS معمولا استفاده می شود
// بهینه سازی شیدرها
// درک مفهوم شیدرها => Vertex Shader و Fragment Shader
// نوشتن شیدرهای کارآمد:
// 1- استفاده از توابع داخلی
// 2- کاهشمحاسبات تکراری
// 3- استفاده از متغیرهای لوکال
// بهینه سازی عملیات ریاضی در شیدرها:
// 1- جایگزینی عملیات سنگین
// 2- استفاده از مقادیر ثابت
// 3- استفاده از فضای مشترک
//Three.js بهینه سازی شیدرهای
// 1- استفاده از شیدرهای آماده مثل MeshStandardMaterial و MeshPhongMaterial
// 2- تغییر شیدرهای موجود با استفاده از onBeforeCompile
// استفاده از ابزارهای پروفایلینگ مثل Spector.js 
// جزئیات کامل درباره بافت ها، هندسه ها و مواد بارگذاری شده در جی پی یو را نشان می دهد
// و GPU Profiler برای مشاهده بارگزاری جی پی یو استفاده کنید

// نمونه استفاده از تکستچر فشرده در پایین
const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('/assets/basis/')  // مسیر صحیح به WASM
    .detectSupport(renderer);

ktx2Loader.load(
    './src/asset/cubemap_rgba8_linear.ktx2',
    texture => {
        const mat = new THREE.MeshStandardMaterial({ map: texture });
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), mat);
        scene.add(mesh);
    },
    xhr => console.log(`بارگذاری: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`),
    err => console.error('خطا در بارگذاری KTX2:', err)
);

//استفاده از onBeforeCompile برای ایجاد تغییر در شیدر داخلی موجود
// ساخت material معمولی
const material = new THREE.MeshStandardMaterial({ color: 0x4488aa });
material.onBeforeCompile = shader => {
  shader.uniforms.uTime = { value: 0 };

  shader.vertexShader =
    'uniform float uTime;\n' +
    shader.vertexShader;

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
      vec3 transformed = vec3(position);
      transformed.y += sin(position.x * 2.0 + uTime) * 0.5;
      // جایگزینی بدون فراخوان اصلی:
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    `
  );

  material.userData.shader = shader;
};

const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
mesh1.translateX(-4);
scene.add(mesh1);

// ——— Animate ———
function animate(time) {
  requestAnimationFrame(animate);
  controls.update();

  const shaderData = material.userData.shader;
  if (shaderData && shaderData.uniforms && shaderData.uniforms.uTime) {
    shaderData.uniforms.uTime.value = time * 0.001;
  }

  renderer.render(scene, camera);
}
animate();

// ——— Resize Handler ———
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});