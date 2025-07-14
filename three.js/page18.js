import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';  // ← این خط را اضافه کنید
import { mergeGeometriesSimple } from './src/utils/mergeGeometriesSimple';

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

//بهینه سازی هندسه ها: ساده سازی هندسه ها، استفاده از هندسه های مشترک
//روش اول: ساده سازی هندسه ها
// استفاده از Decimation به معنی تجزیه با استفاده از SimplifyModifier()
// ——— Mesh با هندسه ساده‌شده ———
const material = new THREE.MeshStandardMaterial({ color: 0x3366ff });
const geometry = new THREE.BoxGeometry(4, 4, 4);
const modifier = new SimplifyModifier();
const simplifiedGeometry = modifier.modify(geometry, Math.floor(geometry.attributes.position.count * 0.5));
//                          ↑ تعداد رئوس نهایی = تعداد اولیه × 0.5

const mesh1 = new THREE.Mesh(simplifiedGeometry, material);
scene.add(mesh1);

//به غیر از متد بالا می توان از (LOD) Level of Detail برای ساده سازی هندسه استفاده کرد
//روش دوم: 
// Shared Geometries استفاده از هندسه های مشترک
// با استفاده از InstancedMesh می توان با یک ژیومتری چندین شی با هندسه ی مشابه ساخت
//روش سوم: کاهش تعداد راس ها 
//آبجکت های ساده تر: استفاده از هندسه های ساده تر مانند مکعب ها، کره ها و استوانه ها به جای مدل های پیچیده
//نرمال سازی هندسه ها: برخی از مدل ها ممکن است از چندین رأس مشابه در نقاط مختلف استفاده کنند. شما می توانید این رأس ها را با هم ترکیب کرده و هندسه را ساده تر کنید
//مثال برای روش بالا
const geoA = new THREE.BoxGeometry(1, 1, 1);
const geoB = new THREE.SphereGeometry(0.5);
geoB.translate(2, 0, 0); // کره را ۲ واحد به راست ببرد
const mergedGeo = mergeGeometriesSimple([geoA, geoB]);
const mesh2 = new THREE.Mesh(mergedGeo, material);
mesh2.position.x = 4;
scene.add(mesh2);
//(Optimized Primitives)  روش سوم: استفاده از هندسه های پیش ساخته و بهینه مثل همین باکس ژیومتری بالا
// (Textures and Materials Optimization)  بهینه سازی تکسچرها و مواد
// مثلا برای مواد میتوان از مش بیسیک متریال به جای مش استاندارد متریال استفاده کرد

// ——— Animate ———
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// ——— Resize Handler ———
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
