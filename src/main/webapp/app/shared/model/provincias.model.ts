export interface IProvincias {
    id?: number;
    nombre?: string;
}

export class Provincias implements IProvincias {
    constructor(public id?: number, public nombre?: string) {}
}
