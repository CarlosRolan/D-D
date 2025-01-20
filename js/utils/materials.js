import * as THREE from 'three';

const cDefault = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const c1 = new THREE.MeshLambertMaterial({ color: 0xffffff });
const c2 = new THREE.MeshLambertMaterial({ color: 0Xff0000 });
const heroDefault = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const fogOfWar = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.7 });

export {
    cDefault, c1, heroDefault, c2, fogOfWar
}