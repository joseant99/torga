export interface ICategoriasDormi {
    id?: number;
    nombre?: string;
}

export class CategoriasDormi implements ICategoriasDormi {
    constructor(public id?: number, public nombre?: string) {}
}
