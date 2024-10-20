import { getMesh } from '../utils/meshLoader.js';
import { Miniature } from './miniature.js';

const offset = 1.25; // Mismo offset que usaste para las casillas

class Hero extends Miniature {
    constructor(name, description, mesh) {
        super(name, description, mesh);
    }

    move(pos) {
        const x = pos[0];
        const y = pos[1];
        this.mesh.position.set(x * offset, 0, y * offset);
    }

    rotate() {
        
    }
}

async function createRouge() {
    const mesh = await getMesh("/obj/heroes/rouge.glb");
    const rouge = new Hero("rouge", "des", mesh);
    // Ajustar la posición del jugador sobre el tablero
    // hero.position.set(playerPositionX * offset, 1, playerPositionZ * offset);
    // Elevar ligeramente en Y (0.5) para que no esté dentro del suelo
    return rouge;
}

async function createRanger() {
    const mesh = await getMesh("/obj/heroes/ranger.glb");
    const ranger = new Hero("ranger", "des", mesh);
    // Ajustar la posición del jugador sobre el tablero
    // hero.position.set(playerPositionX * offset, 1, playerPositionZ * offset);
    // Elevar ligeramente en Y (0.5) para que no esté dentro del suelo
    return ranger;
}

async function createMage() {
    const mesh = await getMesh("/obj/heroes/mage.glb");
    const mage = new Hero("mage", "des", mesh);
    // Ajustar la posición del jugador sobre el tablero
    // hero.position.set(playerPositionX * offset, 1, playerPositionZ * offset);
    // Elevar ligeramente en Y (0.5) para que no esté dentro del suelo
    return mage;
}

async function createCleric() {
    const mesh = await getMesh("/obj/heroes/cleric.glb");
    const cleric = new Hero("cleric", "des", mesh);
    // Ajustar la posición del jugador sobre el tablero
    // hero.position.set(playerPositionX * offset, 1, playerPositionZ * offset);
    // Elevar ligeramente en Y (0.5) para que no esté dentro del suelo
    return cleric;
}

export { createCleric, createMage, createRanger, createRouge };
