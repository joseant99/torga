import { IProductosPresupuestoPedidos } from 'app/shared/model//productos-presupuesto-pedidos.model';
import { IIluminacion } from 'app/shared/model//iluminacion.model';

export interface IIluminacionProdPrePed {
    id?: number;
    productosPresupuestoPedidos?: IProductosPresupuestoPedidos;
    iluminacion?: IIluminacion;
}

export class IluminacionProdPrePed implements IIluminacionProdPrePed {
    constructor(public id?: number, public productosPresupuestoPedidos?: IProductosPresupuestoPedidos, public iluminacion?: IIluminacion) {}
}
