import * as THREE from 'three';
import { c1, cDefault } from '../utils/materials.js';
import { createWall } from './wall.js';

const offset = 1.25; // Desfase entre filas
const tableSize = 11; // Número de filas

class Dungeon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.dungeonFloor = new THREE.Group();

        const cellGeometry = new THREE.BoxGeometry(1, 0.2, 1);

        // Crear las celdas y las posiciona
        for (let i = 0; i < tableSize; i++) {
            for (let j = 0; j < tableSize; j++) {
                const cell = new THREE.Mesh(cellGeometry, (i === 0 && j === 0) ? c1 : cDefault);
                cell.name = `cell`;
                cell.cellPos = [i, j];

                // Posicionar cada celda
                const xPos = j * offset;
                const zPos = i * offset;
                cell.position.set(xPos, 0, zPos);

                this.dungeonFloor.add(cell);

                // Añadir paredes alrededor de los bordes
                if (i === 0) this.addExteriorWall([i, j], 'left');
                if (i === tableSize - 1) this.addExteriorWall([i, j], 'right');
                if (j === 0) this.addExteriorWall([i, j], 'front');
                if (j === tableSize - 1) this.addExteriorWall([i, j], 'back');
            }
        }
    }

    // Función para añadir una pared en una posición específica
    async addExteriorWall(cellPos, position) {
        const wall = await createWall();
        wall.putWall(cellPos, position);

        this.dungeonFloor.add(wall.mesh);
    }
}

function createDungeon() {
    return new Dungeon(tableSize, tableSize);
}

export { createDungeon };
