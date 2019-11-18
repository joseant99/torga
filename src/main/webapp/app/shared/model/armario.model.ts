import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IArmario {
    id?: number;
    mensaje?: string;
    imagenContentType?: string;
    imagen?: any;
    numeroPuertas?: number;
    anchoMin?: number;
    anchoMax?: number;
    numCostado?: number;
    productosDormitorio?: IProductosDormitorio;
}

export class Armario implements IArmario {
    constructor(
        public id?: number,
        public mensaje?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public numeroPuertas?: number,
        public anchoMin?: number,
        public anchoMax?: number,
        public numCostado?: number,
        public productosDormitorio?: IProductosDormitorio
    ) {}
}
