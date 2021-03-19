export interface IExposicion {
    id?: number;
    codCli?: string;
    idDireccion?: number;
    idCatalogo?: number;
    tiene?: number;
    color?: string;
}

export class Exposicion implements IExposicion {
    constructor(
        public id?: number,
        public codCli?: string,
        public idDireccion?: number,
        public idCatalogo?: number,
        public tiene?: number,
        public color?: string
    ) {}
}
