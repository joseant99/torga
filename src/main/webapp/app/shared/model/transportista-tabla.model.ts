import { IProvincias } from 'app/shared/model//provincias.model';
import { IMunicipios } from 'app/shared/model//municipios.model';

export interface ITransportistaTabla {
    id?: number;
    nombre?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    nombreFiscal?: string;
    cp?: number;
    provincias?: IProvincias;
    municipios?: IMunicipios;
}

export class TransportistaTabla implements ITransportistaTabla {
    constructor(
        public id?: number,
        public nombre?: string,
        public telefono?: string,
        public email?: string,
        public direccion?: string,
        public nombreFiscal?: string,
        public cp?: number,
        public provincias?: IProvincias,
        public municipios?: IMunicipios
    ) {}
}
