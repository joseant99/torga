export interface ICoordenadas {
    id?: number;
    cp?: string;
    latitud?: string;
    longitud?: string;
}

export class Coordenadas implements ICoordenadas {
    constructor(public id?: number, public cp?: string, public latitud?: string, public longitud?: string) {}
}
