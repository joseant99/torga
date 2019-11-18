import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IPuertasPrecios {
    id?: number;
    ancho?: number;
    alto?: number;
    precio?: number;
    tipo?: string;
    productosDormitorio?: IProductosDormitorio;
}

export class PuertasPrecios implements IPuertasPrecios {
    constructor(
        public id?: number,
        public ancho?: number,
        public alto?: number,
        public precio?: number,
        public tipo?: string,
        public productosDormitorio?: IProductosDormitorio
    ) {}
}
