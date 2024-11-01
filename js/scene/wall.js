import * as THREE from 'three';
import { getMesh } from '../utils/meshLoader.js';
import { Miniature } from './miniature.js';

const offset = 1.25; // Desfase entre filas
const wallMesh = await getMesh("/obj/objects/wall.glb");

function createWall() {
    return new Wall(wallMesh.clone());
}

class Wall extends Miniature {
    constructor(mesh) {
        console.log("Creando pared...");
        super("Wall", "A cold stone wall", mesh);
    }

    putWall(cellPos, orientation) {
        console.log(`Moviendo pared a la posición ${cellPos}`);
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

            default:
                break;
        }
    }
}

export {
    createWall
}