import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { texture } from "three/tsl";

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

console.log("three.js =>", THREE);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd7a89e);
const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(7);
// scene.add(axesHelper);
const canvas1 = document.querySelector(".threeD");
const size = {
    width: 800,
    height: 600
}
const square = new THREE.BoxGeometry(1, 1, 1);
const plane = new THREE.PlaneGeometry(3, 3, 32);
const sphere = new THREE.SphereGeometry(1.5, 32, 32);
const cylinder = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
const cone = new THREE.ConeGeometry(1, 2, 32);
const icosahedron = new THREE.IcosahedronGeometry(1.5, 0);
const circle = new THREE.CircleGeometry(1, 20);
const torus = new THREE.TorusGeometry(1, 0.4);
const torusKnot = new THREE.TorusKnotGeometry(1, 0.4);
const greenColor = new THREE.MeshBasicMaterial({
    color: 0x00ff00,  //رنگ متریال
    // map: texture,  //بافت تصویر
    wireframe: true,  //باشد، هندسه به صورت شبکه ای نمایش داده می شود. true اگر
    // opacity: 0.5,  //شفافیت
    transparent: true,  //متریال شفافیت را فعال می کند
    side: THREE.FrontSide,  //تعیین جهت قابل مشاهده سطح )مقدار پیش فرض) THREE.FrontSide
});
const blueColor = new THREE.MeshStandardMaterial({
    color: 0x0542fc,  //رنگ متریال
    metalness: 0.3,  //میزان فلزی بودن 0 تا 1
    roughness: 0.5,  //زبری سطح 0 تا 1
    // map: texture,  //بافت تصویر
    //نقشه نرمال برای نمایشجزئیات سطح :normalMap
    //نقشه محیط برای بازتاب :envMap
    //شفافیت :opacity
});
//در زیر مدل پیشرفته تر از MeshStandardMaterial آمده
// const PhysicalMaterial = new THREE.MeshPhysicalMaterial({
//     color: 0x00ff00,
//     metalness: 0.8,
//     roughness: 0.3,
//     clearcoat: 1.0,  //میزان لایه شفاف روی سطح 0 تا 1
//     //clearcoatRoughness: زبری لایه شفاف
//     transmission: 0.9,  //میزان عبور نور 0 تا 1
//     //ior: ضریب شکست نور مقدار پیش فرض: ۱.۵
// });
//متریال زیر براق و بازتابی است که برای سطوح صاف و فلزی مناسب است.
const pinkColor = new THREE.MeshPhongMaterial({
    color: 0xfc05f8,
    shininess: 100,  //میزان براقیت
    specular: 0x111111,  //رنگ بازتاب نور
    //map: بافت
    //normalMap: نقشه نرمال
});
//مدل زیر برای سطوح نرم و مات که تحت تأثیر نور قرار می گیرند
const redColor = new THREE.MeshLambertMaterial({
    color: 0xfc0505,
    emissive: 0x444444,  //رنگ تابش سطح
    //map: بافت,
    //opacity: شفافیت,
});
//برای نمایش نقاط
// const PointsMaterial = new THREE.PointsMaterial({
//     size: 0.1,
//     color: 0xffffff,
//     //sizeAttenuation: کاهش اندازه با فاصله
//     //map: بافت
// });
//برای خطوط ساده
// const LineBasicMaterial = new THREE.LineBasicMaterial({
//     color: 0xff0000,
//     //linewidth: عرض خط تنها در وب جی ال 1 پشتیبانی می شود
// });
//برای خطوط نقطه چین
// const LineDashedMaterial = new THREE.LineDashedMaterial({
//     color: 0x00ff00,
//     dashSize: 1,
//     gapSize: 0.5,
// });
//برای نوشتن شیدرهای سفارشی
// const ShaderMaterial = new THREE.ShaderMaterial({
//     vertexShader: vertexShaderCode,  //کد شیدر ورتکس
//     fragmentShader: fragmentShaderCode,  //کد شیدر فرگمنت
//     uniforms: { time: { value: 1.0 } },  //متغیرهای قابل تعریف برای شیدر
// });
//متریالی که تنها سایه ها را نمایش می دهد
// const ShadowMaterial = new THREE.ShadowMaterial({
// opacity: 0.5,
// });
//برای ایجاد اشیاء دوبعدی
// const SpriteMaterial = new THREE.SpriteMaterial({
// map: spriteTexture,
// color: 0xffffff,
// });
//Three.js اما بدون افزودن کد اضافی توسط ShaderMaterial مشابه
// const RawShaderMaterial = new THREE.RawShaderMaterial({
// vertexShader: rawVertexShader,
// fragmentShader: rawFragmentShader,
// });
// const texture = new THREE.TextureLoader().load('texture.jpg'); // بارگذاری تصویر
// const material = new THREE.MeshBasicMaterial({ map: texture }); // اعمال تصویر روی ماده
const box1 = new THREE.Mesh(square, greenColor); //مکعب
box1.castShadow = true;  // جسم سایه ایجاد می کند
box1.receiveShadow = true; // جسم سایه را دریافت می کند
const plane1 = new THREE.Mesh(plane, blueColor); //صفحه
plane1.castShadow = true;
plane1.receiveShadow = true;
const sphere1 = new THREE.Mesh(sphere, pinkColor); //کره
sphere1.castShadow = true;
sphere1.receiveShadow = true;
const cylinder1 = new THREE.Mesh(cylinder, redColor); //استوانه
cylinder1.castShadow = true;
cylinder1.receiveShadow = true;
const cone1 = new THREE.Mesh(cone, greenColor); //مخروط
cone1.castShadow = true;
cone1.receiveShadow = true;
const icosahedron1 = new THREE.Mesh(icosahedron, blueColor); //بیست وجهی
icosahedron1.castShadow = true;
icosahedron1.receiveShadow = true;
const circle1 = new THREE.Mesh(circle, pinkColor); //دایره
circle1.castShadow = true;
circle1.receiveShadow = true;
const torus1 = new THREE.Mesh(torus, redColor); //حلقه
torus1.castShadow = true;
torus1.receiveShadow = true;
const torusKnot1 = new THREE.Mesh(torusKnot, greenColor); //حلقه گره دار
torusKnot1.castShadow = true;
torusKnot1.receiveShadow = true;
// box1.position.x = 1;
// box1.position.set(1.5, 5.5, -1.5);
box1.rotation.x = degToRad(30);
box1.scale.set(2, 2, 2);
const matrix = new THREE.Matrix4();
matrix.makeTranslation(1.5, 5.5, -1.5);
box1.applyMatrix4(matrix);
plane1.position.set(1.5, -3.5, -1.5);
sphere1.position.set(1.5, -7.5, -1.5);
cylinder1.position.set(1.5, -10.5, -1.5);
cone1.position.set(1.5, -12.5, -1.5);
icosahedron1.position.set(1.5, -15.5, -1.5);
circle1.position.set(1.5, -18.5, -1.5);
torus1.position.set(1.5, -21.5, -1.5);
torusKnot1.position.set(1.5, -24.5, -1.5);
scene.add(box1, plane1, sphere1, cylinder1, cone1, icosahedron1, circle1, torus1, torusKnot1);
const gltfloader = new GLTFLoader();
gltfloader.load('./public/commodore_64__computer_full_pack.glb',
    (gltf) => {
        console.log('gltf =>', gltf);
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        scene.add(gltf.scene);
    },
    (xhr) => {
        console.log(`loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// const pointLight = new THREE.PointLight(0xffffff, 1);
// const spotLight = new THREE.SpotLight(0xffffff, 1);
//spotLight.position.set( تنظیم موقعیت نور // ;( 10, 10, 10
//spotLight.angle = Math.PI / تنظیم زاویه نور // ; 6
//const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 0.5); //رنگ آسمان، زمین و شدت
//scene.add(hemisphereLight);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1.730, 4.557, 2.858);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; //  عرض سایه 
directionalLight.shadow.mapSize.height = 1024; //  ارتفاع سایه 
directionalLight.shadow.camera.near = 0.5; //  نزدیک ترین فاصله سایه 
directionalLight.shadow.camera.far = 50; //  دورترین فاصله سایه 
scene.add(directionalLight);
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
// const camera = new THREE.OrthographicCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 3;
camera.position.set(2.433, 3.621, 3.712);
camera.rotation.set(-44.29, 25.14, 22.51);

// scene.add(camera);
const hdriLoader = new RGBELoader();
hdriLoader.load('./public/studio_small_08_2k.hdr',
    (hdri) => {
        hdri.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = hdri;
        scene.environment = hdri;
    }
);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas1,
    antialias: true
});
const control = new OrbitControls(camera, renderer.domElement);
control.autoRotate = true;
control.addEventListener('change', () => {
    console.log('camera position: ', camera.position);
    console.log('camera rotation: ', camera.rotation);
});
renderer.shadowMap.enabled = true;
renderer.setSize(size.width, size.height);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
}
animate();