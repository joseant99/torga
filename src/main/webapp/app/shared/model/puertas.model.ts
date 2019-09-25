import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IPuertas {
    id?: number;
    nombre?: string;
    imagenContentType?: string;
    imagen?: any;
    productosDormitorio?: IProductosDormitorio;
    puertasProductos?: IProductosDormitorio[];
}

export class Puertas implements IPuertas {
    constructor(
        public id?: number,
        public nombre?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public productosDormitorio?: IProductosDormitorio,
        public puertasProductos?: IProductosDormitorio[]
    ) {}
}
