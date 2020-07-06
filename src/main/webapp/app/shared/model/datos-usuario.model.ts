import { IProvincias } from 'app/shared/model//provincias.model';
import { IMunicipios } from 'app/shared/model//municipios.model';
import { IUser } from 'app/core/user/user.model';
import { IRepreGCompra } from 'app/shared/model//repre-g-compra.model';
import { IFPago } from 'app/shared/model//f-pago.model';
import { IZonas } from 'app/shared/model//zonas.model';
import { ITransportistaTabla } from 'app/shared/model//transportista-tabla.model';

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
    codigo?: number;
    estado?: string;
    fAlta?: string;
    fBaja?: string;
    prioridadCarga?: number;
    apIVA?: string;
    apReq?: string;
    valAlbaran?: string;
    facXAlbaran?: string;
    dto1?: number;
    dto2?: number;
    dto3?: number;
    dtoTras?: number;
    idGc?: string;
    valPedido?: string;
    valPuntos?: string;
    dPago1?: number;
    dPago2?: number;
    dPago3?: number;
    desdeVaca?: string;
    hastaVaca?: string;
    web?: string;
    movil?: string;
    fax?: string;
    ctaContable?: number;
    observaciones?: string;
    observacionesPed?: string;
    observacionesAlb?: string;
    observacionesFac?: string;
    noGiroVaca?: string;
    observacionesDireccion?: string;
    provincias?: IProvincias;
    municipios?: IMunicipios;
    user?: IUser;
    repreGCompra?: IRepreGCompra;
    fPago?: IFPago;
    zonas?: IZonas;
    transportistaTabla?: ITransportistaTabla;
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
        public codigo?: number,
        public estado?: string,
        public fAlta?: string,
        public fBaja?: string,
        public prioridadCarga?: number,
        public apIVA?: string,
        public apReq?: string,
        public valAlbaran?: string,
        public facXAlbaran?: string,
        public dto1?: number,
        public dto2?: number,
        public dto3?: number,
        public dtoTras?: number,
        public idGc?: string,
        public valPedido?: string,
        public valPuntos?: string,
        public dPago1?: number,
        public dPago2?: number,
        public dPago3?: number,
        public desdeVaca?: string,
        public hastaVaca?: string,
        public web?: string,
        public movil?: string,
        public fax?: string,
        public ctaContable?: number,
        public observaciones?: string,
        public observacionesPed?: string,
        public observacionesAlb?: string,
        public observacionesFac?: string,
        public noGiroVaca?: string,
        public observacionesDireccion?: string,
        public provincias?: IProvincias,
        public municipios?: IMunicipios,
        public user?: IUser,
        public repreGCompra?: IRepreGCompra,
        public fPago?: IFPago,
        public zonas?: IZonas,
        public transportistaTabla?: ITransportistaTabla
    ) {}
}
