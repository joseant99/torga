import { ICliente } from 'app/shared/model/cliente.model';

export interface IRepresentante {
    id?: number;
    nombre?: string;
    usuario?: string;
    clientes?: ICliente[];
}

export class Representante implements IRepresentante {
    constructor(public id?: number, public nombre?: string, public usuario?: string, public clientes?: ICliente[]) {}
}
