import { GLTFLoader } from 'GLTFLoader';

//====================================LOADER==================
// Cargar el archivo GLTF
const loader = new GLTFLoader();
// Función para cargar el modelo y devolver una promesa
function loadModel(path) {
    return new Promise((resolve, reject) => {
        loader.load(
            path,  // Ruta al archivo .glb
            function (gltf) {
                const model = gltf.scene;  // Obtenemos el modelo cargado
                resolve(model);  // Resolver la promesa con el modelo
            },
            function (xhr) {
                //console.log((xhr.loaded / xhr.total * 100) + '% cargado');
            },
            function (error) {
                reject('Error al cargar el modelo: ' + error);  // Rechazar la promesa si hay un error
            }
        );
    });
}

// Usar el modelo con async/await
async function getMesh(path) {
    try {
        const model = await loadModel(path);  // Esperar que la promesa se resuelva
        //console.log('El modelo ha sido cargado:', model);
        return await model;

    } catch (error) {
        console.error(error);  // Capturar cualquier error en la carga
    }

    return null;
}
//===============================================================================


export {
    getMesh
}