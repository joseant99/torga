import { IProductosPresupuestoPedidos } from 'app/shared/model//productos-presupuesto-pedidos.model';
import { IContactoFabrica } from 'app/shared/model//contacto-fabrica.model';
import { IUser } from 'app/core/user/user.model';

export interface IMensajes {
    id?: number;
    texto?: string;
    productosPresupuestoPedidos?: IProductosPresupuestoPedidos;
    contactoFabrica?: IContactoFabrica;
    user?: IUser;
}

export class Mensajes implements IMensajes {
    constructor(
        public id?: number,
        public texto?: string,
        public productosPresupuestoPedidos?: IProductosPresupuestoPedidos,
        public contactoFabrica?: IContactoFabrica,
        public user?: IUser
    ) {}
}
