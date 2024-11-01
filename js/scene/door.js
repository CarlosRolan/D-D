import * as THREE from 'three';
import { getMesh } from '../utils/meshLoader.js';
import { Miniature } from './miniature.js';

const offset = 1.25; // Desfase entre filas
const doorMesh = await getMesh("/obj/objects/door.glb");

function createDoor() {
    return new Door(doorMesh);
}

class Door extends Miniature {

    constructor(mesh) {
        super("Door", "An old cranky door", mesh);
    }

    putDoor(cellPos, orientation) {
        this.moveToCell(cellPos);

        // Ajustar la rotación de la pared según la posición
        switch (orientation) {
            case 'left':
                this.mesh.position.x -= offset / 2;
                break;
            case 'right':
                this.mesh.position.x += offset / 2;
                break;
            case 'front':
                this.mesh.position.z -= offset / 2;
                this.mesh.rotation.y = Math.PI / 2;
                break;
            case 'back':
                this.mesh.position.z += offset / 2;
                this.mesh.rotation.y = Math.PI / 2;
                break;
        }
    }
}

export {
    createDoor
}