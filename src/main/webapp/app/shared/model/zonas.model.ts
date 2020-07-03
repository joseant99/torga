export interface IZonas {
    id?: number;
    descripcion?: string;
}

export class Zonas implements IZonas {
    constructor(public id?: number, public descripcion?: string) {}
}
