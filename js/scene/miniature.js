const offset = 1.25; // Mismo offset que usaste para las casillas
class Miniature {
    constructor(name, description, mesh) {
        this.name = name;
        this.description = description;
        this.mesh = mesh;
    }

    moveToCell(pos) {
        const x = pos[0];
        const y = pos[1];
        this.mesh.position.set(x * offset, 0, y * offset);
    }


}

export {
    Miniature
}

