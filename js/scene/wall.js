import * as THREE from 'three';
import { getMesh } from '../utils/meshLoader.js';
import { Miniature } from './miniature.js';

const offset = 1.25; // Desfase entre filas

async function createWall() {
    const wallMesh = await getMesh("/obj/objects/wall.glb");
    return new Wall(wallMesh);
}

class Wall extends Miniature {
    constructor(mesh) {
        super("Wall", "A cold stone wall", mesh);
    }

    putWall(cellPos, orientation) {
        this.moveToCell(cellPos);
        
        // Ajustar la rotación de la pared según la posición
        switch (orientation) {
            case 'left':
                //wall.mesh.rotation.y = Math.PI / 2;
                this.mesh.position.x -= offset / 2;
                break;
            case 'right':
                //wall.mesh.rotation.y = Math.PI / 2;
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
    createWall
}