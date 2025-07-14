import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ——— ۱. بارگذاری تصاویر RAW ———
function loadImage(path) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = path;
    img.onload = () => res(img);
    img.onerror = err => rej(err);
  });
}

// ——— ۲. کمک برای ساخت یک Texture Atlas از یک آرایه Image ———
function makeAtlas(images) {
  const w = images[0].width;
  const h = images[0].height;
  const canvas = document.createElement('canvas');
  canvas.width = w * images.length;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  images.forEach((img, i) => ctx.drawImage(img, i * w, 0, w, h));
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

// ——— ۳. بارگذاری و آماده‌سازی اطلس‌ها ———
async function prepareAtlases() {
  const channels = ['Color', 'NormalGL', 'AmbientOcclusion', 'Roughness'];
  const count = 3; // تعداد مجموعه‌ها: 0،1،2
  // بارگذاری همه‌ی تصاویر
  const images = {};
  for (let ch of channels) {
    images[ch] = await Promise.all(
      Array.from({ length: count }, (_, i) =>
        loadImage(`./src/asset/Texture${i}_${ch}.png`)
      )
    );
  }
  // ساخت اطلس برای هر کانال
  const atlases = {};
  for (let ch of channels) {
    atlases[ch] = makeAtlas(images[ch]);
  }
  return { atlases, count };
}

// ——— ۴. اجرا وقتی اطلس‌ها آماده شدند ———
prepareAtlases().then(({ atlases, count }) => {
  initScene(atlases, count);
}).catch(err => console.error(err));

// ——— ۵. ساخت صحنه با اطلس‌ها و meshهای مختلف ———
function initScene(atlases, count) {
  // Renderer + DOM
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  // Scene & Camera
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202020);
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 6);
  const controls = new OrbitControls(camera, renderer.domElement);

  // Light
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dl = new THREE.DirectionalLight(0xffffff, 1);
  dl.position.set(5, 5, 5);
  scene.add(dl);

  // هندسه پایه
  const geom = new THREE.BoxGeometry(1, 1, 1);
  geom.setAttribute('uv2', geom.attributes.uv); // برای aoMap

  // اندازه هر سلول در UV atlas
  const uStep = 1 / count;

  // برای هر index یک mesh جدا با material جدا می‌سازیم
  for (let i = 0; i < count; i++) {
    // کلون کردن هر تکسچر تا offset/repeat منحصر به آن mesh باشد
    const mapClone = atlases.Color.clone();
    const normalClone = atlases.NormalGL.clone();
    const aoClone = atlases.AmbientOcclusion.clone();
    const roughnessClone = atlases.Roughness.clone();

    // تنظیم UV
    [mapClone, normalClone, aoClone, roughnessClone].forEach(tex => {
      tex.repeat.set(uStep, 1);
      tex.offset.set(uStep * i, 0);
    });

    // material جدید برای هر mesh
    const mat = new THREE.MeshStandardMaterial({
      map: mapClone,
      normalMap: normalClone,
      aoMap: aoClone,
      roughnessMap: roughnessClone,
      aoMapIntensity: 1
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = (i - (count - 1) / 2) * 1.8;
    scene.add(mesh);
  }

  // انیمیشن و رندر
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // resize handling
  window.addEventListener('resize', () => {
    const w = innerWidth, h = innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}