import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { IRepresentante } from 'app/shared/model/representante.model';

export interface ICliente {
    id?: number;
    codCliente?: string;
    nombre?: string;
    poblacion?: string;
    provincia?: string;
    usuario?: string;
    referenciaclientes?: IReferenciaClientes[];
    representates?: IRepresentante;
}

export class Cliente implements ICliente {
    constructor(
        public id?: number,
        public codCliente?: string,
        public nombre?: string,
        public poblacion?: string,
        public provincia?: string,
        public usuario?: string,
        public referenciaclientes?: IReferenciaClientes[],
        public representates?: IRepresentante
    ) {}
}
