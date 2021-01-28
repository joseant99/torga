export interface IFecha_entrega {
    id?: number;
    fecha?: string;
}

export class Fecha_entrega implements IFecha_entrega {
    constructor(public id?: number, public fecha?: string) {}
}
