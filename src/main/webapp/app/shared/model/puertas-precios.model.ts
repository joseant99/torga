import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { ICasco } from 'app/shared/model//casco.model';

export interface IPuertasPrecios {
    id?: number;
    ancho?: number;
    alto?: number;
    precio?: number;
    tipo?: string;
    puerta1?: number;
    puerta2?: number;
    puerta3?: number;
    puerta4?: number;
    puerta5?: number;
    puerta6?: number;
    puerta7?: number;
    puerta8?: number;
    productosDormitorio?: IProductosDormitorio;
    casco?: ICasco;
}

export class PuertasPrecios implements IPuertasPrecios {
    constructor(
        public id?: number,
        public ancho?: number,
        public alto?: number,
        public precio?: number,
        public tipo?: string,
        public puerta1?: number,
        public puerta2?: number,
        public puerta3?: number,
        public puerta4?: number,
        public puerta5?: number,
        public puerta6?: number,
        public puerta7?: number,
        public puerta8?: number,
        public productosDormitorio?: IProductosDormitorio,
        public casco?: ICasco
    ) {}
}
