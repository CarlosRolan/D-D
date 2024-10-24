import * as THREE from 'three';
import { getMesh } from '../utils/meshLoader.js';
import { Miniature } from './miniature.js';

async function createDoor() {
    const doorMesh = await getMesh("/obj/objects/door.glb");
    return new Door(doorMesh);
}

class Door extends Miniature {
    constructor(mesh) {
        super("Door", "An old cranky door", mesh);

    }

    putDoor(cellPos) {
        this.moveToCell(cellPos);
        this.mesh.position.x -= 0.5;
    }
}

export {
    createDoor
}