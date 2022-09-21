import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './weather.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// generating tours object 
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({ color: 0xFF1347 });
// const tours = new THREE.Mesh(geometry, material); //combining geometry + material

// scene.add(tours); //adding the object to the scene

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement); //scroll enabled

function addStar() {
  //creating new object
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material); //combining geometry + material

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(250).fill().forEach(addStar);

const moonTexture = new THREE.TextureLoader().load('earth.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(7,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    // normalMap:normalTexture //overwriting the moon image
  })
)

scene.add(moon);
moon.position.set(20,0,0);

const spaceTexture = new THREE.TextureLoader().load('space.jpg'); //adding the background
scene.background = spaceTexture;

function animate() { //function for keep rerendering
  requestAnimationFrame(animate);

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.02;
  moon.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();