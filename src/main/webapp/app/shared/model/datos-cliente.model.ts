import { IProvincias } from 'app/shared/model//provincias.model';
import { IMunicipios } from 'app/shared/model//municipios.model';
import { IPresupuestoPedido } from 'app/shared/model//presupuesto-pedido.model';

export interface IDatosCliente {
    id?: number;
    nombre?: string;
    correo?: string;
    telefono?: string;
    direccion?: string;
    codigoPostal?: string;
    fines?: string;
    enviar?: string;
    provincias?: IProvincias;
    municipios?: IMunicipios;
    presupuestoPedido?: IPresupuestoPedido;
}

export class DatosCliente implements IDatosCliente {
    constructor(
        public id?: number,
        public nombre?: string,
        public correo?: string,
        public telefono?: string,
        public direccion?: string,
        public codigoPostal?: string,
        public fines?: string,
        public enviar?: string,
        public provincias?: IProvincias,
        public municipios?: IMunicipios,
        public presupuestoPedido?: IPresupuestoPedido
    ) {}
}
