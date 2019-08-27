import { IAcabados } from 'app/shared/model//acabados.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model//productos-presupuesto-pedidos.model';

export interface IAcabadosProductosPresupuestoPedido {
    id?: number;
    acabados?: IAcabados;
    productosPresupuestoPedidos?: IProductosPresupuestoPedidos;
}

export class AcabadosProductosPresupuestoPedido implements IAcabadosProductosPresupuestoPedido {
    constructor(public id?: number, public acabados?: IAcabados, public productosPresupuestoPedidos?: IProductosPresupuestoPedidos) {}
}
