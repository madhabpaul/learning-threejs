import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = - (event.clientY / size.height - 0.5);
})




/* Texture */
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () =>{
//     texture.needsUpdate = true;
// }

// image.src = 'door.jpg';

const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('door.jpg');

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

colorTexture.rotation = Math.PI * 0.25;
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;


/* font loader*/

const fontLoader = new THREE.FontLoader()

fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'MADHAB',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     -( textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )

        textGeometry.center();
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: colorTexture});
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);
    }
)


/* Debug UI initialization*/
const gui = new dat.GUI({ closed: true, width: 400 });
// to hide
// gui.hide()

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}


//Scene
const scene = new THREE.Scene();

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

/* Cube object or MESH */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: parameters.color});


/* custom geometry 1*/
// const geometry = new THREE.Geometry()
// const material = new THREE.MeshBasicMaterial({ color: 0xde4a54});

// const vertex1 = new THREE.Vector3(0, 0, 0);
// geometry.vertices.push(vertex1);

// const vertex2 = new THREE.Vector3(0, 3, 0);
// geometry.vertices.push(vertex2);

// const vertex3 = new THREE.Vector3(0, 5, 1);
// geometry.vertices.push(vertex3);

// const face = new THREE.Face3(0, 1, 2)
// geometry.faces.push(face);

/* custom geometry 2*/
// const geometry = new THREE.Geometry()
// const material = new THREE.MeshBasicMaterial({ color: 0xde4a54});

// for(let i =0; i< 50; i++){
//     for(let j = 0; j < 3; j++){
//         geometry.vertices.push(new THREE.Vector3(
//             Math.random() - 0.5,
//             Math.random() - 0.5,
//             Math.random() - 0.5
//         ))
//     }
//     const verticesIndex = i * 3
//     geometry.faces.push(new THREE.Face3(
//         verticesIndex,
//         verticesIndex +1,
//         verticesIndex + 2
//     ))
// }

/* adding geometry to scene */
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -1
scene.add(mesh);

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


/* Texture */
const CubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = CubeTextureLoader.load([
    '/environmentMaps/0/px.jpg',
    '/environmentMaps/0/nx.jpg',
    '/environmentMaps/0/py.jpg',
    '/environmentMaps/0/ny.jpg',
    '/environmentMaps/0/pz.jpg',
    '/environmentMaps/0/nz.jpg'
])
/* material */
const material2 = new THREE.MeshStandardMaterial();
// material2.flatShading = true;
material2.metalness = 0.7;
material2.roughness = 0.2;
material2.envMap = environmentMapTexture;

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16), material2
)
sphere.position.x = -2
scene.add(sphere)



/* mesh group */
// const group = new THREE.Group();
// scene.add(group);

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// )
// group.add(cube1);

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x0000ff })
// )
// cube2.position.x = -2;
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// )
// cube3.position.x = 2;
// group.add(cube3);

/* debug */
//                         min, max, precision
// gui.add(mesh.position, 'y', -3, 3, 0.01);
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation');
// checkbox
gui
    .add(mesh, 'visible');
gui.add(material, 'wireframe');
// color
gui
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color);
    });
// button rotation
gui
    .add(parameters, 'spin');



/* lights */
const ambientLight = new THREE.AmbientLight(0xfffff, 0.5)
scene.add(ambientLight); 

const directionalLight = new THREE.DirectionalLight(0xff547e, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff547e, 0x0000ff, 0.3);
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xe75428, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight);

const rectLight = new THREE.RectAreaLight( 0x4e20ff, 1,  1, 1 );
rectLight.position.set( -1.5, 0, 1.5 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight )

//Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);



window.addEventListener('resize', () => {
    // update size
    size.width = window.innerWidth,
        size.height = window.innerWidth

    // update camera
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    // update render size
    renderer.setSize(size.width, size.height)
    // limiting pixel ratio to 2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/* double click fullscreen */
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
    // if(!document.fullscreenElement){
    //     canvas.requestFullscreen();
    // } else{
    //     document.exitFullscreen()
    // }
})
//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
// const aspectRatio = size.width/size.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// camera.lookAt(mesh.position);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width, size.height);

// orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true


// renderer.render(scene, camera);

// clock
// const clock = new THREE.Clock();

// gsap.to(group.position, { duration: 1, delay: 1, x: 2 } );

// animations
const tick = () => {
    // time
    // const elapsedTime = clock.getElapsedTime();

    // update objects
    // group.position.y =Math.sin(elapsedTime);
    // group.position.x = Math.cos(elapsedTime);

    // update camera with cursor
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(new THREE.Vector3());

    // update orbit controls 
    controls.update();

    // render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();