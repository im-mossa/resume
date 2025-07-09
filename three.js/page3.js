import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
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
const geometry = new THREE.BoxGeometry();
const material1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const material2 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const material3 = new THREE.MeshStandardMaterial({ color: 0x0055ff });
const cube1 = new THREE.Mesh(geometry, material1);
const cube2 = new THREE.Mesh(geometry, material1);
const cube3 = new THREE.Mesh(geometry, material2);
const cube4 = new THREE.Mesh(geometry, material3);
cube1.position.set(1, 0, 0);
cube2.position.set(-1, 0, 0);
cube3.position.set(-1, 1, 0);
cube4.position.set(-1, 2, 1);
scene.add(ambientLight, dirLight, cube1, cube2, cube3, cube4);

const tween2 = new TWEEN.Tween(cube2.position)
    .to({ y: 2 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out);

const tween1 = new TWEEN.Tween(cube1.position)
    .to({ x: 1, y: 1, z: 1 }, 2000)  //مقادیر مقصد و مدت زمان
    .easing(TWEEN.Easing.Quadratic.Out) // تنظیم نوع حرکت
    .onUpdate(() => {
        console.log(cube1.position); // به روزرسانی در هر فریم
    })
    .chain(tween2).start();

const tween3 = new TWEEN.Tween(cube3.material.color)
    .to({ r: 0, g: 1, b: 0 }, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .repeat(Infinity)
    .yoyo(true)
    .start();

const tween4 = new TWEEN.Tween(cube4.position)
    .to({ x: 0, y: 1, z: 1 }, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .repeat(Infinity)
    .yoyo(true)
    .start();

function animate() {
    requestAnimationFrame(animate);
    tween1.update();  //به روز رسانی tween.js
    tween2.update();
    tween3.update();
    tween4.update();
    renderer.render(scene, camera);
}
animate();