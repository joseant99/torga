import { IArmario } from 'app/shared/model//armario.model';
import { IAcabados } from 'app/shared/model//acabados.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model//productos-presupuesto-pedidos.model';

export interface IPresupuestoArmario {
    id?: number;
    ancho?: number;
    alto?: number;
    fondo?: number;
    cascoPrecio?: number;
    armario?: IArmario;
    acabadosCasco?: IAcabados;
    acabados?: IAcabados;
    acabadosInterior?: IAcabados;
    productosPresupuestoPedidos?: IProductosPresupuestoPedidos;
}

export class PresupuestoArmario implements IPresupuestoArmario {
    constructor(
        public id?: number,
        public ancho?: number,
        public alto?: number,
        public fondo?: number,
        public cascoPrecio?: number,
        public armario?: IArmario,
        public acabadosCasco?: IAcabados,
        public acabados?: IAcabados,
        public acabadosInterior?: IAcabados,
        public productosPresupuestoPedidos?: IProductosPresupuestoPedidos
    ) {}
}
