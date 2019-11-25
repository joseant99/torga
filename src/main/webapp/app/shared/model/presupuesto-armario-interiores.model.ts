import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IPresupuestoArmario } from 'app/shared/model//presupuesto-armario.model';

export interface IPresupuestoArmarioInteriores {
    id?: number;
    precio?: number;
    productosDormitorio?: IProductosDormitorio;
    presupuestoArmario?: IPresupuestoArmario;
}

export class PresupuestoArmarioInteriores implements IPresupuestoArmarioInteriores {
    constructor(
        public id?: number,
        public precio?: number,
        public productosDormitorio?: IProductosDormitorio,
        public presupuestoArmario?: IPresupuestoArmario
    ) {}
}
