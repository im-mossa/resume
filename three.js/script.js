import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

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
const greenColor = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box1 = new THREE.Mesh(square, greenColor);
// box1.position.x = 1;
box1.position.set(1.5, 5.5, -1.5);
box1.rotation.x = degToRad(30);
scene.add(box1);
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
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1.730,4.557,2.858);
scene.add(directionalLight);
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
// camera.position.z = 3;
camera.position.set(2.433, 3.621, 3.712);
camera.rotation.set(-44.29, 25.14,22.51);

scene.add(camera);
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
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(window.devicePixelRatio);
function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
}
animate();