import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createCleric, createMage, createRanger, createRouge } from './hero.js';
import { camera } from './camera.js';
import { light, ambientLight } from './light.js';
import { dungeonFloor } from './dungeon.js';
import { createGoblin } from './monster.js';

// Create a new scene
const scene = new THREE.Scene();

//We create the miniatures
//const cleric = await createCleric();
const mage = await createMage();
mage.move([0, 0]);
const ranger = await createRanger();
ranger.move([1, 0]);
const rouge = await createRouge();
rouge.move([2, 0]);
const cleric = await createCleric();
cleric.move([3, 0]);

const goblin0 = await createGoblin();
const goblin1 = await createGoblin();

// Setup the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Default Controls
const basicControls = new OrbitControls(camera, renderer.domElement);

//Adding to the scene
const actors = new THREE.Group();
const monsters = new THREE.Group();

//We add the monsters in a group
monsters.add(goblin0.mesh);
monsters.add(goblin1.mesh);

//Monsters added to the acotrs of the scene to later calculate the turns
//actors.add(monsters.mesh);
//actors.add(cleric.mesh);
actors.add(ranger.mesh);
actors.add(mage.mesh);
actors.add(rouge.mesh);
actors.add(cleric.mesh);

scene.add(light);
scene.add(ambientLight);
scene.add(dungeonFloor);
scene.add(actors);


//===============TURN-BASED LOGIC
const turns = actors.children.length;

console.log(turns);



function animate() {
    basicControls.update();
    renderer.render(scene, camera);
}

export { animate, scene, renderer }