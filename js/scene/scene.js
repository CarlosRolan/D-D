import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createCleric, createMage, createWarrior, createRouge } from './hero.js';
import { camera } from './camera.js';
import { light, ambientLight } from './light.js';
import { createDungeonLvl1 } from './dungeon.js';
import { createGoblin } from './monster.js';

// Setup the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Default Controls
const cameraControls = new OrbitControls(camera, renderer.domElement);

// Create a new scene
const scene = new THREE.Scene();

//Create the map
const dungeon1 = createDungeonLvl1();

//We create the heros
const mage = await createMage();
mage.moveToCell([0, 18]);
const ranger = await createWarrior();
ranger.moveToCell([0, 19]);
const rouge = await createRouge();
rouge.moveToCell([0, 20]);
const cleric = await createCleric();
cleric.moveToCell([0, 21]);

//Create the monsters
const goblin0 = await createGoblin();
goblin0.moveToCell([1, 1]);
const goblin1 = await createGoblin();
goblin1.moveToCell([1, 3]);

//Adding to the scene
const actors = new THREE.Group();
const monsters = new THREE.Group();
const objects = new THREE.Group();

//We add the monsters in a group
monsters.add(goblin0.mesh);
monsters.add(goblin1.mesh);

//We add the objects in another group
//objects.add(door1.mesh);

//Monsters added to the acotrs of the scene to later calculate the turns
actors.add(monsters);
actors.add(ranger.mesh);
actors.add(mage.mesh);
actors.add(rouge.mesh);
actors.add(cleric.mesh);

scene.add(light);
scene.add(ambientLight);
scene.add(dungeon1.floor);
scene.add(actors);
scene.add(objects)

//===============TURN-BASED LOGIC
const turns = actors.children.length;

function animate() {
    cameraControls.update();
    renderer.render(scene, camera);
}

export { animate, scene, renderer }