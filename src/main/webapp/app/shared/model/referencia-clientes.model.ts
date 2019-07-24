import { IPedidos } from 'app/shared/model/pedidos.model';
import { ILogistica } from 'app/shared/model/logistica.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IReferenciaClientes {
    id?: number;
    referenciaCliente?: string;
    pedidos?: IPedidos[];
    logisticas?: ILogistica[];
    cliente?: ICliente;
}

export class ReferenciaClientes implements IReferenciaClientes {
    constructor(
        public id?: number,
        public referenciaCliente?: string,
        public pedidos?: IPedidos[],
        public logisticas?: ILogistica[],
        public cliente?: ICliente
    ) {}
}
