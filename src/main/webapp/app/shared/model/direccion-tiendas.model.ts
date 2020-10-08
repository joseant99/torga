import { IProvincias } from 'app/shared/model//provincias.model';
import { IMunicipios } from 'app/shared/model//municipios.model';
import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';

export interface IDireccionTiendas {
    id?: number;
    numero?: number;
    codPostal?: string;
    direccion?: string;
    provincias?: string;
    municipios?: string;
    datosUsuario?: IDatosUsuario;
}

export class DireccionTiendas implements IDireccionTiendas {
    constructor(
        public id?: number,
        public numero?: number,
        public codPostal?: string,
        public direccion?: string,
        public provincias?: string,
        public municipios?: string,
        public datosUsuario?: IDatosUsuario
    ) {}
}
