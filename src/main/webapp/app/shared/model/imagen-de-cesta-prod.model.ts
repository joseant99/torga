export interface IImagenDeCestaProd {
    id?: number;
    imagen?: string;
}

export class ImagenDeCestaProd implements IImagenDeCestaProd {
    constructor(public id?: number, public imagen?: string) {}
}
