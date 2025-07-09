import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ——— ۱. بارگذاری تصاویر با TextureLoader ———
const loader = new THREE.TextureLoader();
Promise.all([0,1,2].map(i =>
  new Promise(resolve => {
    loader.load(`./src/asset/Texture${i}.png`, tex => resolve(tex.image));
  })
)).then(images => {
  // ——— ۲. ساخت یک کانواس به عرض مجموع تصاویر و ارتفاع اولینشان ———
  const w = images[0].width;
  const h = images[0].height;
  const canvas = document.createElement('canvas');
  canvas.width  = w * images.length;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  
  // هر تصویر را کنار هم می‌کشیم
  images.forEach((img, i) => {
    ctx.drawImage(img, i * w, 0, w, h);
  });
  
  // ——— ۳. ساخت CanvasTexture و تنظیم فیلترها ———
  const atlasTexture = new THREE.CanvasTexture(canvas);
  atlasTexture.magFilter = THREE.NearestFilter;
  atlasTexture.minFilter = THREE.NearestFilter;
  atlasTexture.wrapS = THREE.ClampToEdgeWrapping;
  atlasTexture.wrapT = THREE.ClampToEdgeWrapping;
  
  initScene(atlasTexture, images.length);
});

function initScene(atlas, tiles) {
    // ——— Renderer ———
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ——— Scene & Camera ———
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);
    const camera = new THREE.PerspectiveCamera(
        50, innerWidth / innerHeight, 0.1, 1000
    );
    camera.position.set(0, 2, 5);

    // ——— Controls ———
    new OrbitControls(camera, renderer.domElement);

    // ——— Light ———
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(5, 5, 5);
    scene.add(dl);

    // ——— محاسبه UV هر سلول ———
    const cols = tiles, rows = 1;
    const cellU = 1 / cols, cellV = 1 / rows;

    // ——— ایجاد چند Sprite با UV متفاوت ———
    for (let i = 0; i < tiles; i++) {
        const mat = new THREE.SpriteMaterial({
            map: atlas,
            uvOffset: new THREE.Vector2(i * cellU, 1 - cellV),
            uvRepeat: new THREE.Vector2(cellU, cellV)
        });
        const sprite = new THREE.Sprite(mat);
        sprite.position.set((i - (tiles - 1) / 2) * 1.5, 0, 0);
        scene.add(sprite);
    }

    // ——— حلقهٔ رندر ———
    (function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    })();

    // ——— واکنش به ریسایز ———
    window.addEventListener('resize', () => {
        const w = innerWidth, h = innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}
