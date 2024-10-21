import { getMesh } from '../utils/meshLoader.js';
import { Miniature } from './miniature.js';

const offset = 1.25; // Mismo offset que usaste para las casillas

async function getHerosData() {
    try {
        const response = await fetch("../data/heros.json");
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}
const defaultHerosData = await getHerosData();

console.log(defaultHerosData);

class Hero extends Miniature {
    constructor(name, description, mesh) {
        super(name, description, mesh);
        this.mesh.type = "hero";
        this.hp = hp;
        this.attack = attack;
        this.movement = movement;
    }

    moveToCell(pos) {
        const x = pos[0];
        const y = pos[1];
        this.mesh.position.set(x * offset, 0, y * offset);
    }

    rotate() {
        this.mesh.x = Math.PI / 2
    }
}

async function createRouge() {
    const mesh = await getMesh("/obj/heroes/rouge.glb");
    const rouge = new Hero("rouge", "des", mesh);
    return rouge;
}

async function createRanger() {
    const mesh = await getMesh("/obj/heroes/ranger.glb");
    const ranger = new Hero("ranger", "des", mesh);
    return ranger;
}

async function createMage() {
    const mesh = await getMesh("/obj/heroes/mage.glb");
    const mage = new Hero("mage", "des", mesh);
    return mage;
}

async function createCleric() {
    const mesh = await getMesh("/obj/heroes/cleric.glb");
    const cleric = new Hero("cleric", "des", mesh);
    return cleric;
}

export { createCleric, createMage, createRanger, createRouge };
