export interface ICajeado {
    id?: number;
    codigo?: string;
    tipo?: string;
    precio?: number;
    piloto?: number;
}

export class Cajeado implements ICajeado {
    constructor(public id?: number, public codigo?: string, public tipo?: string, public precio?: number, public piloto?: number) {}
}
