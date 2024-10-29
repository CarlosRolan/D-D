import { getMesh } from "../utils/meshLoader.js";
import { Miniature } from "./miniature.js";

//Data for all MONSTERS
async function getCreaturesData() {
    try {
        const response = await fetch("/res/data/mosnters.json");
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}
const allMonstersData = await getCreaturesData();

async function createGoblin() {
    const mesh = await getMesh("/obj/monsters/goblin.glb");
    return new Monster(allMonstersData.goblin, mesh);
}

class Monster extends Miniature {
    constructor(monsterData, mesh) {
        const { name, description, hp, attack, movement } = monsterData;
        super(name, description, mesh);
        this.hp = hp;
        this.attack = attack;
        this.movement = movement;
        this.mesh = mesh;
        const offset = 1.25;
        mesh.position.set(0 * offset, 1, 0 * offset);
    }
}

export {
    createGoblin
}

