import { IProvincias } from 'app/shared/model//provincias.model';

export interface IMunicipios {
    id?: number;
    nombre?: string;
    provincias?: IProvincias;
}

export class Municipios implements IMunicipios {
    constructor(public id?: number, public nombre?: string, public provincias?: IProvincias) {}
}
