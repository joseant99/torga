import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IInterioresArmarios {
    id?: number;
    ancho?: number;
    alto?: number;
    fondo?: number;
    precio?: number;
    imagenContentType?: string;
    imagen?: any;
    mensaje?: string;
    productosDormitorio?: IProductosDormitorio;
}

export class InterioresArmarios implements IInterioresArmarios {
    constructor(
        public id?: number,
        public ancho?: number,
        public alto?: number,
        public fondo?: number,
        public precio?: number,
        public imagenContentType?: string,
        public imagen?: any,
        public mensaje?: string,
        public productosDormitorio?: IProductosDormitorio
    ) {}
}
