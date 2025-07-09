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
const geometry = new THREE.BoxGeometry();
const material1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube1 = new THREE.Mesh(geometry, material1);
scene.add(ambientLight, dirLight, cube1);

//Keyframe ساخت انیمیشن های
const mixer = new THREE.AnimationMixer(cube1);
const positionTrack = new THREE.VectorKeyframeTrack(
    '.position',
    [0, 1, 2, 3],  //زمان های کلیدی
    [-2, 1, 0, 2, 0, 2, 0, 0, 0,-2, 1, 0],  //(X, Y, Z)
);
const clip = new THREE.AnimationClip('moveCube', 3, [positionTrack]);
const action = mixer.clipAction(clip);
action.play();
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  let deltaTime = clock.getDelta(); // زمان بین دو فریم
  mixer.update(deltaTime);
  renderer.render(scene, camera);
}
animate();
