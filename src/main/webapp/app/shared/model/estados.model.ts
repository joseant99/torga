import { IEstados } from 'app/shared/model/estados.model';

export interface IEstados {
    id?: number;
    estadoPedido?: string;
}

export class Estados implements IEstados {
    constructor(public id?: number, public estadoPedido?: string) {}
}
