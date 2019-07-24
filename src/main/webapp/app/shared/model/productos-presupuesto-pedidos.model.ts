import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IDimensionesProductoTipo } from 'app/shared/model//dimensiones-producto-tipo.model';
import { IPresupuestoPedido } from 'app/shared/model//presupuesto-pedido.model';
import { ITipoProducto } from 'app/shared/model//tipo-producto.model';
import { ITiposApoyo } from 'app/shared/model//tipos-apoyo.model';

export interface IProductosPresupuestoPedidos {
    id?: number;
    productosDormitorio?: IProductosDormitorio;
    dimensionesProductoTipo?: IDimensionesProductoTipo;
    presupuestoPedido?: IPresupuestoPedido;
    tipoProducto?: ITipoProducto;
    tiposApoyo?: ITiposApoyo;
}

export class ProductosPresupuestoPedidos implements IProductosPresupuestoPedidos {
    constructor(
        public id?: number,
        public productosDormitorio?: IProductosDormitorio,
        public dimensionesProductoTipo?: IDimensionesProductoTipo,
        public presupuestoPedido?: IPresupuestoPedido,
        public tipoProducto?: ITipoProducto,
        public tiposApoyo?: ITiposApoyo
    ) {}
}
