import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface ITipoProducto {
    id?: number;
    mensaje?: string;
    imagenContentType?: string;
    imagen?: any;
    productosDormitorio?: IProductosDormitorio;
}

export class TipoProducto implements ITipoProducto {
    constructor(
        public id?: number,
        public mensaje?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public productosDormitorio?: IProductosDormitorio
    ) {}
}
