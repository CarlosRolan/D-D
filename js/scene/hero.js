import { getMesh } from '../utils/meshLoader.js';
import { Miniature } from './miniature.js';



async function getHerosData() {
    try {
        const response = await fetch("/res/data/heros.json");
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}
const herosData = await getHerosData();

class Hero extends Miniature {
    constructor(heroData, mesh) {
        const { name, description, hp, movement, armor, inventory } = heroData;
        mesh.miniature = "hero";
        super(name, description, mesh);
        this.maxHP = hp;
        this.movement = movement;
        this.armor = armor;
        this.inventory = new Array(inventory).fill(null);
    }



}

async function createRouge() {
    const mesh = await getMesh("/obj/heroes/rouge.glb");
    const rouge = new Hero(herosData.rouge, mesh);
    console.log(rouge);
    return rouge;
}

async function createWarrior() {
    const mesh = await getMesh("/obj/heroes/ranger.glb");
    const warrior = new Hero(herosData.warrior, mesh);
    console.log(warrior);
    return warrior;
}

async function createMage() {
    const mesh = await getMesh("/obj/heroes/mage.glb");
    const mage = new Hero(herosData.mage, mesh);
    console.log(mage);
    return mage;
}

async function createCleric() {
    const mesh = await getMesh("/obj/heroes/cleric.glb");
    const cleric = new Hero(herosData.cleric, mesh);
    console.log(cleric);
    return cleric;
}

export { createCleric, createMage, createWarrior, createRouge };
