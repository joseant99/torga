import { IAcabados } from 'app/shared/model//acabados.model';
import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IPresupuestoArmario } from 'app/shared/model//presupuesto-armario.model';

export interface IPresupuestoArmarioPuertas {
    id?: number;
    precio?: number;
    acabados?: IAcabados;
    productosDormitorio?: IProductosDormitorio;
    presupuestoArmario?: IPresupuestoArmario;
}

export class PresupuestoArmarioPuertas implements IPresupuestoArmarioPuertas {
    constructor(
        public id?: number,
        public precio?: number,
        public acabados?: IAcabados,
        public productosDormitorio?: IProductosDormitorio,
        public presupuestoArmario?: IPresupuestoArmario
    ) {}
}
