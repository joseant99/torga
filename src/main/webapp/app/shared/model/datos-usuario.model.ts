import { IProvincias } from 'app/shared/model//provincias.model';
import { IMunicipios } from 'app/shared/model//municipios.model';
import { IUser } from 'app/core/user/user.model';

export interface IDatosUsuario {
    id?: number;
    nombreCompleto?: string;
    email?: string;
    telefono?: string;
    nombreComercial?: string;
    direccion?: string;
    codPostal?: string;
    logoContentType?: string;
    logo?: any;
    cif?: string;
    nombreFiscal?: string;
    provincias?: IProvincias;
    municipios?: IMunicipios;
    user?: IUser;
}

export class DatosUsuario implements IDatosUsuario {
    constructor(
        public id?: number,
        public nombreCompleto?: string,
        public email?: string,
        public telefono?: string,
        public nombreComercial?: string,
        public direccion?: string,
        public codPostal?: string,
        public logoContentType?: string,
        public logo?: any,
        public cif?: string,
        public nombreFiscal?: string,
        public provincias?: IProvincias,
        public municipios?: IMunicipios,
        public user?: IUser
    ) {}
}
