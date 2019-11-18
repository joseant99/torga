export interface ICasco {
    id?: number;
    ancho?: number;
    alto?: number;
    precio?: number;
    precioCostado?: number;
}

export class Casco implements ICasco {
    constructor(public id?: number, public ancho?: number, public alto?: number, public precio?: number, public precioCostado?: number) {}
}
