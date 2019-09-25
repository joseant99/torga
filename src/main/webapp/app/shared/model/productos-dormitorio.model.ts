import { IPuertas } from 'app/shared/model//puertas.model';

export interface IProductosDormitorio {
    id?: number;
    nombre?: string;
    imagenContentType?: string;
    imagen?: any;
    categoriasDormiId?: number;
    puertas?: IPuertas[];
}

export class ProductosDormitorio implements IProductosDormitorio {
    constructor(
        public id?: number,
        public nombre?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public categoriasDormiId?: number,
        public puertas?: IPuertas[]
    ) {}
}
