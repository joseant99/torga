import { Moment } from 'moment';
import { IPedidos } from 'app/shared/model/pedidos.model';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { IEstados } from 'app/shared/model/estados.model';
import { ITransportistas } from 'app/shared/model/transportistas.model';

export interface ILogistica {
    id?: number;
    numPedido?: string;
    ruta?: string;
    carro?: string;
    transportistas?: ITransportistas;
    estados?: IEstados;
    fechaEntrega?: Moment;
    fechaPedido?: Moment;
    pedidos?: IPedidos;
    referenciaclientes?: IReferenciaClientes;
}

export class Logistica implements ILogistica {
    constructor(
        public id?: number,
        public numPedido?: string,
        public ruta?: string,
        public carro?: string,
        public transportistas?: ITransportistas,
        public estados?: IEstados,
        public fechaEntrega?: Moment,
        public fechaPedido?: Moment,
        public pedidos?: IPedidos,
        public referenciaclientes?: IReferenciaClientes
    ) {}
}
