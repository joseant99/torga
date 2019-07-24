import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IDimensionesProducto } from 'app/shared/model//dimensiones-producto.model';

export interface ITiposApoyo {
    id?: number;
    nombre?: string;
    imagenContentType?: string;
    imagen?: any;
    precio?: number;
    altura?: number;
    ancho?: number;
    fondo?: number;
    productoApoyo?: IProductosDormitorio;
    productosDormitorio?: IProductosDormitorio;
    dimensionesProducto?: IDimensionesProducto;
}

export class TiposApoyo implements ITiposApoyo {
    constructor(
        public id?: number,
        public nombre?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public precio?: number,
        public altura?: number,
        public ancho?: number,
        public fondo?: number,
        public productoApoyo?: IProductosDormitorio,
        public productosDormitorio?: IProductosDormitorio,
        public dimensionesProducto?: IDimensionesProducto
    ) {}
}
