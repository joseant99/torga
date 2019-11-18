import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IInterioresArmarioNuevos {
    id?: number;
    nombre?: string;
    ancho?: number;
    precio?: number;
    luz?: number;
    productosDormitorio?: IProductosDormitorio;
}

export class InterioresArmarioNuevos implements IInterioresArmarioNuevos {
    constructor(
        public id?: number,
        public nombre?: string,
        public ancho?: number,
        public precio?: number,
        public luz?: number,
        public productosDormitorio?: IProductosDormitorio
    ) {}
}
