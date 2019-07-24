import { IUser } from 'app/core/user/user.model';

export interface IPresupuestoPedido {
    id?: number;
    codigo?: string;
    pedido?: number;
    fecha_presupuesto?: string;
    fecha_pedido?: string;
    user?: IUser;
}

export class PresupuestoPedido implements IPresupuestoPedido {
    constructor(
        public id?: number,
        public codigo?: string,
        public pedido?: number,
        public fecha_presupuesto?: string,
        public fecha_pedido?: string,
        public user?: IUser
    ) {}
}
