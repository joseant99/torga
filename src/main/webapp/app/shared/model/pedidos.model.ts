import { ILogistica } from 'app/shared/model/logistica.model';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';

export interface IPedidos {
    id?: number;
    numPedido?: string;
    factura?: string;
    confirmacion?: string;
    importe?: number;
    logistica?: ILogistica;
    referenciaclientes?: IReferenciaClientes;
}

export class Pedidos implements IPedidos {
    constructor(
        public id?: number,
        public numPedido?: string,
        public factura?: string,
        public confirmacion?: string,
        public importe?: number,
        public logistica?: ILogistica,
        public referenciaclientes?: IReferenciaClientes
    ) {}
}
