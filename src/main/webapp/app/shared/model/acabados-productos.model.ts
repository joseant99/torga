import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { IAcabados } from 'app/shared/model/acabados.model';

export interface IAcabados_Productos {
    id?: number;
    productosDormitorio?: IProductosDormitorio;
    acabados?: IAcabados[];
}

export class Acabados_Productos implements IAcabados_Productos {
    constructor(public id?: number, public productosDormitorio?: IProductosDormitorio, public acabados?: IAcabados[]) {}
}
