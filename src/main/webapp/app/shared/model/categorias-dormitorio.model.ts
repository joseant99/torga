export interface ICategorias_Dormitorio {
    id?: number;
    nombreCategoriaDormitorio?: string;
}

export class Categorias_Dormitorio implements ICategorias_Dormitorio {
    constructor(public id?: number, public nombreCategoriaDormitorio?: string) {}
}
