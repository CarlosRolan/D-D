const offset = 1.25; // Mismo offset que usaste para las casillas
class Miniature {
    constructor(name, description, mesh) {
        this.name = name;
        this.description = description;
        this.mesh = mesh;
    }

    //OJO aqui es importante  intercambiar x por y para que las matrices sean como las visualizamos
    moveToCell(pos) {
        const x = pos[0];
        const y = pos[1];
        this.mesh.position.set(y * offset, 0, x * offset);
    }


}

export {
    Miniature
}

