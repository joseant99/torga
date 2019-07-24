import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { ITipoProducto } from 'app/shared/model//tipo-producto.model';

export interface IDimensionesProductoTipo {
    id?: number;
    ancho?: number;
    alto?: number;
    fondo?: number;
    mensaje?: string;
    imagenContentType?: string;
    imagen?: any;
    precio?: number;
    anchoMesitaIdeal?: string;
    productosDormitorio?: IProductosDormitorio;
    tipoProducto?: ITipoProducto;
}

export class DimensionesProductoTipo implements IDimensionesProductoTipo {
    constructor(
        public id?: number,
        public ancho?: number,
        public alto?: number,
        public fondo?: number,
        public mensaje?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public precio?: number,
        public anchoMesitaIdeal?: string,
        public productosDormitorio?: IProductosDormitorio,
        public tipoProducto?: ITipoProducto
    ) {}
}
