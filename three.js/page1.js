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
const material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const material3 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cube1 = new THREE.Mesh(geometry, material1);
cube1.position.x = -2;
const cube2 = new THREE.Mesh(geometry, material2);
const cube3 = new THREE.Mesh(geometry, material3);
cube3.position.x = 2;
const selectableObjects = new THREE.Group();
selectableObjects.add(cube1, cube2, cube3);
scene.add(ambientLight, dirLight, selectableObjects);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

let selectedObject = null;

window.addEventListener('click', () => {
    const intersects = raycaster.intersectObjects(selectableObjects.children, true);
    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        selectedObject.material.color.set(0xff00ff);
        console.log('Selected Object:', selectedObject);
    }
});

function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(selectableObjects.children, true);
    selectableObjects.children.forEach((cube) => {
        // فقط زمانی رنگ رو تغییر بده که مکعب انتخاب‌شده نباشه
        if (cube !== selectedObject) {
            cube.material.color.set(0xffffff);
        }
    });
    intersects.forEach((intersect) => {
        if (intersect.object !== selectedObject) {
            intersect.object.material.color.set(0x0026ff);
        }
    });
    renderer.render(scene, camera);
}
animate();
