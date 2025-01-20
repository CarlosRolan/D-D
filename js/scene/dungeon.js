import * as THREE from 'three';
import { c1, cDefault, c2, fogOfWar } from '../utils/materials.js';
import { createWall } from './wall.js';
import { createDoor } from './door.js';

const offset = 1.25; // Desfase entre filas

const dungeonData = await loadDungeonData();

async function loadDungeonData() {
    try {
        const response = await fetch('/res/data/maps.json');

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo: ${response.status} ${response.statusText}`);
        }

        const dungeonData = await response.json();

        return dungeonData;

    } catch (error) {
        console.error("Error al cargar los datos del dungeon:", error);
        return false;
    }
}

class Dungeon {
    constructor(data, initialPos) {
        this.floor = new THREE.Group();
        this.initialPos = initialPos;

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const cell = this.createCell(i, j);

                const cellData = data[i][j];

                // Añadir paredes en el borde superior
                if (i === 0) this.placeWall([i, j], 'front');
                // Añadir paredes en el borde inferior
                if (i === data.length - 1) this.placeWall([i, j], 'back');
                // Añadir paredes en el borde izquierdo
                if (j === 0) this.placeWall([i, j], 'left');
                // Añadir paredes en el borde derecho, comprobando el largo de cada fila
                if (j === data[i].length - 1) this.placeWall([i, j], 'right');


                //console.log(`${i} ${j}`);

                if (cellData && typeof cellData === 'object' && !Array.isArray(cellData) && Object.keys(cellData).length === 0) {

                } else {
                    switch (cellData) {

                        //In the middle of the cell
                        case 1:
                            this.placeWall([i, j]);
                            break;
                        case 2:
                            this.placeDoor([i, j]);
                            break;

                        //WALL
                        case 10:
                            this.placeWall([i, j], "right");
                            break;
                        case 11:
                            this.placeWall([i, j], "left");
                            break;
                        case 12:
                            this.placeWall([i, j], "front");
                            break;
                        case 13:
                            this.placeWall([i, j], "back");
                            break;

                        //DOOR
                        case 20:
                            this.placeDoor([i, j], "right");
                            break;
                        case 21:
                            this.placeDoor([i, j], "left");
                            break;
                        case 22:
                            this.placeDoor([i, j], "front");
                            break;
                        case 23:
                            this.placeDoor([i, j], "back");
                            break;

                        default:

                            break;
                    }
                }

                this.floor.add(cell);
            }
        }

    }

    createCell(i, j) {
        const cellGeometry = new THREE.BoxGeometry(1, 0.2, 1);
        let cell;
        cell = new THREE.Mesh(
            cellGeometry,
            i === 0 && j === 0 ? c1 : (i === 0 && j === 1 ? c2 : cDefault)
        );

        cell.name = `cell`;
        cell.cellPos = [i, j];

        // Posicionar cada celda
        const xPos = (j * offset);
        const zPos = (i * offset);
        cell.position.set(xPos, 0, zPos);
        return cell;
    }

    // Función para añadir una pared en una posición específica
    placeWall(cellPos, position) {
        const wall = createWall();
        wall.putWall(cellPos, position);
        this.floor.add(wall.mesh);
    }

    placeDoor(cellPos, position) {
        const door = createDoor();
        door.putDoor(cellPos, position);
        this.floor.add(door.mesh);
    }

    moveFloor(x, y, z) {
        this.floor.position.set(x, y, z);
    }
}

function createDungeonLvl1() {
    const dungeonA = new Dungeon(dungeonData["lvl1"]);

    return dungeonA;
}

export { createDungeonLvl1 };


