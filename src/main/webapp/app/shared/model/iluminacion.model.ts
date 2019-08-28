import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IIluminacion {
    id?: number;
    precio?: number;
    productosDormitorio?: IProductosDormitorio;
}

export class Iluminacion implements IIluminacion {
    constructor(public id?: number, public precio?: number, public productosDormitorio?: IProductosDormitorio) {}
}
