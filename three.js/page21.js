import * as THREE from 'three';

// یک رندرر روی یک کانواس
const canvas = document.getElementById('mainCanvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setScissorTest(true);

// یک صحنه واحد
const scene = new THREE.Scene();

// سه دوربین
const camera1 = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 1000);
const camera3 = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 1000);
camera1.position.set(0, 0, 5);
camera2.position.set(5, 0, 0); camera2.lookAt(0, 0, 0);
camera3.position.set(0, 5, 0); camera3.lookAt(0, 0, 0);

// هندسه‌ها و یک متریال مشترک
const geoA = new THREE.ConeGeometry(1, 2, 32);
const geoB = new THREE.IcosahedronGeometry(1.5, 0);
const geoC = new THREE.TorusKnotGeometry(1, 0.4);
const mat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

// سه Mesh
const meshA = new THREE.Mesh(geoA, mat);
const meshB = new THREE.Mesh(geoB, mat);
const meshC = new THREE.Mesh(geoC, mat);

// قرار دادن هر Mesh در یک لایه‌ی منحصربه‌فرد
meshA.layers.set(0);
meshB.layers.set(1);
meshC.layers.set(2);

// اضافه کردن به یک صحنه
scene.add(meshA, meshB, meshC);

// بعد از ساخت AmbientLight و DirectionalLight
const al = new THREE.AmbientLight(0xffffff, 0.5);
const dl = new THREE.DirectionalLight(0xffffff, 1);

// می‌خواهیم این نورها روی لایه‌های 0,1,2 تأثیرگذار باشند:
for (let layer = 0; layer < 3; layer++) {
  al.layers.enable(layer);
  dl.layers.enable(layer);
}

scene.add(al, dl);

const bgColors = [0xff0000, 0xd6d61e, 0x0000ff];
const cameras = [camera1, camera2, camera3];

function animate() {
    requestAnimationFrame(animate);

    // بچرخون همه
    meshA.rotation.x += 0.01; meshA.rotation.y += 0.01;
    meshB.rotation.x += 0.01; meshB.rotation.y += 0.01;
    meshC.rotation.x += 0.01; meshC.rotation.y += 0.01;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const thirdW = Math.floor(w / 3);

    for (let i = 0; i < 3; i++) {
        // انتخاب دوربین و لایه
        const cam = cameras[i];
        cam.layers.set(i);

        // تنظیم viewport و scissor برای هر بخش
        const x = thirdW * i;
        renderer.setViewport(x, 0, thirdW, h);
        renderer.setScissor(x, 0, thirdW, h);

        // پاک کردن همان بخش با رنگ بک‌گراند خودش
        renderer.setClearColor(bgColors[i]);
        renderer.clear( /* color */ true, /* depth */ false);

        // رندر صحنه‌ی واحد ولی با دوربین فعلی
        renderer.render(scene, cam);
    }
}

animate();


// Resize handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});
