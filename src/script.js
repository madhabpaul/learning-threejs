import './style.css'; 
import * as THREE from 'three';
import gsap from 'gsap';
//Scene
const scene = new THREE.Scene();

// Cube object or MESH
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xde4a36});
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // position
// // mesh.position.x=0.7;
// // mesh.position.y=-0.6;
// // mesh.position.z=1; 
// mesh.position.set(0.7, -0.6, 1);

// // scale
// mesh.scale.set(2,0.5,0.5);

// // rotation
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;

// mesh group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff})
)
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00})
)
cube3.position.x = 2;
group.add(cube3);

//Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const size = {
    width: 800,
    height: 600
}
//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z=3;
scene.add(camera);

// camera.lookAt(mesh.position);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
   canvas: canvas
})
renderer.setSize(size.width, size.height);

// renderer.render(scene, camera);

// clock
// const clock = new THREE.Clock();

gsap.to(group.position, { duration: 1, delay: 1, x: 2 } );

// animations
const tick = () => {
    // time
    // const elapsedTime = clock.getElapsedTime();

    // // update objects
    // group.position.y =Math.sin(elapsedTime);
    // group.position.x = Math.cos(elapsedTime);

    // render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();