import { IProvincias } from 'app/shared/model//provincias.model';
import { IMunicipios } from 'app/shared/model//municipios.model';
import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';

export interface IDireccionTiendas {
    id?: number;
    numero?: number;
    codPostal?: number;
    direccion?: string;
    provincias?: IProvincias;
    municipios?: IMunicipios;
    datosUsuario?: IDatosUsuario;
}

export class DireccionTiendas implements IDireccionTiendas {
    constructor(
        public id?: number,
        public numero?: number,
        public codPostal?: number,
        public direccion?: string,
        public provincias?: IProvincias,
        public municipios?: IMunicipios,
        public datosUsuario?: IDatosUsuario
    ) {}
}
