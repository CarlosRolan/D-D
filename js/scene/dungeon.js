import * as THREE from 'three';
import { c1, cDefault } from '../utils/materials.js';

const dungeonFloor = new THREE.Group();

const cellGeometry = new THREE.BoxGeometry(1, 0.2, 1);

// Parámetros para la pared de ladrillos
const tableSize = 11;   // Número de filas
const offset = 1.25; // Desfase de las filas alternas
// Crear los ladrillos y posicionarlos
for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {

        const cell = new THREE.Mesh(cellGeometry, (i == 0 && j == 0) ? c1 : cDefault);
        cell.name = `cell`;
        cell.cellPos = [i, j];
        // Posición del ladrillo
        // Añadir un pequeño espacio entre ladrillos
        const xPos = i * offset;
        const zPos = j * offset;

        cell.position.set(xPos, 0, zPos); // Desfase en las filas impares

        // Añadir el ladrillo al grupo
        dungeonFloor.add(cell);
    }
}

//dungeonFloor.rotation.x = -Math.PI / 2; // Rotar 90 grados en el eje X

export { dungeonFloor }

