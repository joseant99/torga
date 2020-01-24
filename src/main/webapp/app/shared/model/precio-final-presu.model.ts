import { IPresupuestoPedido } from 'app/shared/model//presupuesto-pedido.model';
import { IDireccionTiendas } from 'app/shared/model//direccion-tiendas.model';

export interface IPrecioFinalPresu {
    id?: number;
    precioProds?: string;
    totalSinIva?: number;
    iva?: number;
    totalConIva?: number;
    descuentoPorcentaje?: number;
    precioDescuento?: number;
    presupuestoPedido?: IPresupuestoPedido;
    direccionTiendas?: IDireccionTiendas;
}

export class PrecioFinalPresu implements IPrecioFinalPresu {
    constructor(
        public id?: number,
        public precioProds?: string,
        public totalSinIva?: number,
        public iva?: number,
        public totalConIva?: number,
        public descuentoPorcentaje?: number,
        public precioDescuento?: number,
        public presupuestoPedido?: IPresupuestoPedido,
        public direccionTiendas?: IDireccionTiendas
    ) {}
}
