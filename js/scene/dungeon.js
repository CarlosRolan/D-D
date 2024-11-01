import * as THREE from 'three';
import { c1, cDefault, c2 } from '../utils/materials.js';
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
    constructor(data) {
        this.dungeonFloor = new THREE.Group();

        console.log(data);

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const cell = this.createCell(i, j);

                const cellData = data[i][j];

                // Añadir paredes alrededor de los bordes
                if (i === 0) this.placeWall([i, j], 'front');
                if (i === data.length - 1) this.placeWall([i, j], 'back');
                if (j === 0) this.placeWall([i, j], 'left');
                if (j === data.length - 1) this.placeWall([i, j], 'right');

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
                        case 20:
                            this.placeDoor([i, j], "left");
                            break;
                        case 20:
                            this.placeDoor([i, j], "front");
                            break;
                        case 20:
                            this.placeDoor([i, j], "back");
                            break;



                        default:
                            break;
                    }
                }

                this.dungeonFloor.add(cell);
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
        const xPos = j * offset;
        const zPos = i * offset;
        cell.position.set(xPos, 0, zPos);

        return cell;
    }

    // Función para añadir una pared en una posición específica
    placeWall(cellPos, position) {
        const wall = createWall();
        wall.putWall(cellPos, position);
        this.dungeonFloor.add(wall.mesh);
    }

    placeDoor(cellPos, position) {
        const door = createDoor();
        door.putDoor(cellPos, position);
        this.dungeonFloor.add(door.mesh);
    }
}

function createDungeonLvl1() {
    return new Dungeon(dungeonData["1"]);
}

export { createDungeonLvl1 };


//Crear una dungeon vacia solo con paredes exteriores 
/*for (let i = 0; i < 11; i++) {
          for (let j = 0; j < 11; j++) {

              const cell = this.createCell(i, j);

              this.dungeonFloor.add(cell);

              // Añadir paredes alrededor de los bordes
                if (i === 0) this.placeWall([i, j], 'left');
                if (i === 11 - 1) this.placeWall([i, j], 'right');
                if (j === 0) this.placeWall([i, j], 'front');
                if (j === 11 - 1) this.placeWall([i, j], 'back');
          }
      }*/
