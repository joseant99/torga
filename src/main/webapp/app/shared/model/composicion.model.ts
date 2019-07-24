export interface IComposicion {
    id?: number;
    nombre?: string;
    imagenContentType?: string;
    imagen?: any;
}

export class Composicion implements IComposicion {
    constructor(public id?: number, public nombre?: string, public imagenContentType?: string, public imagen?: any) {}
}
