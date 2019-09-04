import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IMedidasEspeciales {
    id?: number;
    ancho?: number;
    fondo?: number;
    alto?: number;
    precio?: number;
    min?: number;
    max?: number;
    productosDormitorio?: IProductosDormitorio;
}

export class MedidasEspeciales implements IMedidasEspeciales {
    constructor(
        public id?: number,
        public ancho?: number,
        public fondo?: number,
        public alto?: number,
        public precio?: number,
        public min?: number,
        public max?: number,
        public productosDormitorio?: IProductosDormitorio
    ) {}
}
