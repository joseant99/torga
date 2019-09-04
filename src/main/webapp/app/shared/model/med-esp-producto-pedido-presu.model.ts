import { IProductosPresupuestoPedidos } from 'app/shared/model//productos-presupuesto-pedidos.model';

export interface IMedEspProductoPedidoPresu {
    id?: number;
    ancho?: number;
    fondo?: number;
    alto?: number;
    precio?: number;
    productosPresupuestoPedidos?: IProductosPresupuestoPedidos;
}

export class MedEspProductoPedidoPresu implements IMedEspProductoPedidoPresu {
    constructor(
        public id?: number,
        public ancho?: number,
        public fondo?: number,
        public alto?: number,
        public precio?: number,
        public productosPresupuestoPedidos?: IProductosPresupuestoPedidos
    ) {}
}
