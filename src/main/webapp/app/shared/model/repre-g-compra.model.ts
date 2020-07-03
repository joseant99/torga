export interface IRepreGCompra {
    id?: number;
    nombre?: string;
    cif?: string;
    activo?: boolean;
    fAlta?: string;
    fBaja?: string;
    comision?: number;
    dto1?: number;
    com1?: number;
    dto2?: number;
    com2?: number;
    dto3?: number;
    com3?: number;
    dto4?: number;
    com4?: number;
    dto5?: number;
    com5?: number;
    dtoGrupo?: number;
    ctaContable?: number;
    observaciones?: string;
    apIva?: boolean;
    apReq?: boolean;
    tipoIva?: number;
    retencion?: number;
    direccion?: string;
    cp?: number;
    poblacion?: string;
    provincia?: string;
    zona?: string;
    tipo?: string;
    email?: string;
    web?: string;
    objetivos?: number;
    fijo?: number;
    movil?: number;
    fax?: string;
    codigo?: number;
}

export class RepreGCompra implements IRepreGCompra {
    constructor(
        public id?: number,
        public nombre?: string,
        public cif?: string,
        public activo?: boolean,
        public fAlta?: string,
        public fBaja?: string,
        public comision?: number,
        public dto1?: number,
        public com1?: number,
        public dto2?: number,
        public com2?: number,
        public dto3?: number,
        public com3?: number,
        public dto4?: number,
        public com4?: number,
        public dto5?: number,
        public com5?: number,
        public dtoGrupo?: number,
        public ctaContable?: number,
        public observaciones?: string,
        public apIva?: boolean,
        public apReq?: boolean,
        public tipoIva?: number,
        public retencion?: number,
        public direccion?: string,
        public cp?: number,
        public poblacion?: string,
        public provincia?: string,
        public zona?: string,
        public tipo?: string,
        public email?: string,
        public web?: string,
        public objetivos?: number,
        public fijo?: number,
        public movil?: number,
        public fax?: string,
        public codigo?: number
    ) {
        this.activo = this.activo || false;
        this.apIva = this.apIva || false;
        this.apReq = this.apReq || false;
    }
}
