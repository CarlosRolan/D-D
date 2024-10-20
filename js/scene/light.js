import * as THREE from 'three';

// Setup scene lighting
const light = new THREE.DirectionalLight();
light.intensity = 2;
light.position.set(2, 10, 10);
light.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

export { light, ambientLight }