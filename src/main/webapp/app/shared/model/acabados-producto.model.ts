import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IAcabados } from 'app/shared/model//acabados.model';

export interface IAcabadosProducto {
    id?: number;
    productosDormitorio?: IProductosDormitorio;
    acabados?: IAcabados[];
}

export class AcabadosProducto implements IAcabadosProducto {
    constructor(public id?: number, public productosDormitorio?: IProductosDormitorio, public acabados?: IAcabados[]) {}
}
