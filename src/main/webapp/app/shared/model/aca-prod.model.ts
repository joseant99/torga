import { IAcabados } from 'app/shared/model//acabados.model';
import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { ITipoProducto } from 'app/shared/model//tipo-producto.model';

export interface IAcaProd {
    id?: number;
    imagenContentType?: string;
    imagen?: any;
    acabados?: IAcabados[];
    productosDormitorio?: IProductosDormitorio;
    tipoProducto?: ITipoProducto;
}

export class AcaProd implements IAcaProd {
    constructor(
        public id?: number,
        public imagenContentType?: string,
        public imagen?: any,
        public acabados?: IAcabados[],
        public productosDormitorio?: IProductosDormitorio,
        public tipoProducto?: ITipoProducto
    ) {}
}
