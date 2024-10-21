import * as THREE from 'three';
import { renderer, scene } from './scene.js';
import { camera } from './camera.js';
import { heroDefault, cDefault } from '../utils/materials.js';  // Materiales originales

//===================UI========================
const moveBtn = document.getElementById("moveBtn");
const makeMoveBtn = document.getElementById("makeMoveBtn");  // Asume que tienes este botón en el HTML
const attackBtn = document.getElementById("attackBtn");
const inventoryBtn = document.getElementById("inventoryBtn");

let moveActionEnabled = false;
let attackActionEnabled = false;

attackBtn.addEventListener('click', ()=> {
    if (selectedMesh != null) {
        selectedMesh.position.x += Math.PI / 2;
    }
})

// Función para habilitar el movimiento
moveBtn.addEventListener('click', () => {
    restoreOriginalColor(selectedMesh);
    selectedMesh = null;
    moveActionEnabled = true;
    moveBtn.style.display = 'none';
    makeMoveBtn.style.display = 'block';
});

// Función para confirmar el movimiento
makeMoveBtn.addEventListener('click', () => {
    if (moveActionEnabled) {
        if (selectedCellToMove != null) {
            moveHeroToCell(selectedMesh);  // Mover el héroe a la casilla seleccionada
        } else {
            alert("Necesitas selecionar la casilla primero");
        }
    }
    restoreOriginalColor(selectedCellToMove);
    selectedMesh = null;
    selectedCellToMove = null;
    moveActionEnabled = false;
    makeMoveBtn.style.display = 'none';
    moveBtn.style.display = 'block';  // Restaurar el botón original
});
//=============================================

let selectedMesh = null;
let selectedCellToMove = null;
const raycaster = new THREE.Raycaster();
const clock = new THREE.Clock();
let animationInProgress = false;  // Bandera para controlar la animación
let moveSpeed = 0.1;  // Velocidad de movimiento (ajusta según necesidad)

// Variables de animación
let startPosition, targetPosition, animationStartTime;

// Función para manejar el clic del ratón
function onMouseDown(event) {
    const coords = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    );

    raycaster.setFromCamera(coords, camera);
    const intersections = raycaster.intersectObjects(scene.children, true);

    if (intersections.length > 0) {
        const intersection = intersections[0];


        // Restaurar el color original del objeto previamente seleccionado
        if (selectedMesh != null && selectedMesh !== intersection.object) {
            restoreOriginalColor(selectedMesh);  // Restaurar color del objeto anterior
        }

        // Guardar el nuevo objeto seleccionado
        selectedMesh = intersection.object;

        console.log(selectedMesh);

        switch (selectedMesh.name) {
            case "hero":
                console.log("Hero clicked");
                break;
            case "cell":
                if (moveActionEnabled) {
                    selectedCellToMove = selectedMesh;
                }
                break;
            default:
                console.log("Clicked object without a name");
                break;
        }

        darkenObject(selectedMesh);
    }
}

// Función para mover el héroe al mesh de la casilla clicada
function moveHeroToCell(cell) {
    const targetPos = cell.position.clone();  // Obtener la posición objetivo
    targetPos.y += 1;  // Elevar el héroe para que no quede dentro del suelo

    if (!animationInProgress) {
        moveHeroTo(targetPos);  // Mover el héroe
    }
}

// Función para iniciar el movimiento del héroe
function moveHeroTo(targetPos) {
    startPosition = hero.position.clone();  // Posición inicial del héroe
    targetPosition = targetPos.clone();     // Posición objetivo
    animationStartTime = clock.getElapsedTime();  // Tiempo de inicio de la animación
    animationInProgress = true;  // Activar la animación
    requestAnimationFrame(animate);  // Continuar animando
}

// Función para oscurecer el objeto seleccionado
function darkenObject(object) {
    const material = object.material.clone();  // Clonar el material para no afectar al material global
    material.color.multiplyScalar(0.6);  // Oscurecer el color un 40%
    object.material = material;  // Asignar el nuevo material
}

// Función para restaurar el color original del objeto seleccionado
function restoreOriginalColor(object) {

    switch (object.name) {
        case "hero":
            object.material = heroDefault;
            break;
        case "cell":
            object.material = cDefault;
            break;
        case "monster":
            break;
        default:
            object.material = cDefault;
            break;
    }
}

// Función para animar el movimiento del héroe
function animate() {
    if (animationInProgress) {
        const elapsedTime = clock.getElapsedTime() - animationStartTime;
        const duration = 1.0;  // Duración de la animación en segundos
        const bounceHeight = 0.5;  // Altura del rebote

        // Usar una curva de interpolación suave (ease out)
        const t = Math.min(elapsedTime / duration, 1);  // Progreso normalizado (0 a 1)
        const bounce = Math.sin(t * Math.PI);  // Aplicar un "rebote" usando seno

        // Interpolación lineal entre la posición inicial y la final
        hero.position.lerpVectors(startPosition, targetPosition, t);
        hero.position.y = 1 + bounce * bounceHeight;  // Añadir el rebote en el eje Y

        // Finalizar la animación cuando esté completa
        if (t >= 1) {
            animationInProgress = false;
            hero.position.y = 1;  // Asegurarse de que la posición final en Y sea la correcta
        }
    }

    renderer.render(scene, camera);  // Renderizar la escena
    requestAnimationFrame(animate);  // Continuar animando
}

export { onMouseDown };
