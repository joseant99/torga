import { ILogistica } from 'app/shared/model/logistica.model';

export interface ITransportistas {
    id?: number;
    transportistaPedido?: string;
    logisticas?: ILogistica[];
}

export class Transportistas implements ITransportistas {
    constructor(public id?: number, public transportistaPedido?: string, public logisticas?: ILogistica[]) {}
}
