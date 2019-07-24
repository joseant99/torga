export interface ICategorias {
    id?: number;
    nombreCategoria?: string;
}

export class Categorias implements ICategorias {
    constructor(public id?: number, public nombreCategoria?: string) {}
}
