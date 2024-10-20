// text.js
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; // Correcta importación


const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';
export function createText(text, position = {x: 0, y: 0, z: 0}, color = 0x00ff00) {
    return new Promise((resolve, reject) => {
        // Instanciar FontLoader correctamente
        const loader = new FontLoader();

        loader.load(fontUrl, function(font) {
            // Crear la geometría del texto
            const textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 1,
                height: 0.1, // Profundidad del texto 3D
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.1,
                bevelOffset: 0,
                bevelSegments: 5
            });

            // Crear el material para el texto
            const textMaterial = new THREE.MeshLambertMaterial({ color: color });

            // Crear el mesh del texto
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Posicionar el texto
            textMesh.position.set(position.x, position.y, position.z);

            // Resolver la promesa con el mesh creado
            resolve(textMesh);
        }, undefined, function(error) {
            reject(error);
        });
    });
}
