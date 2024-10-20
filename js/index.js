
import { onMouseDown } from './scene/controls.js';
import { animate, renderer } from './scene/scene.js';

document.body.appendChild(renderer.domElement);

renderer.setAnimationLoop(animate);

document.addEventListener('mousedown', onMouseDown);