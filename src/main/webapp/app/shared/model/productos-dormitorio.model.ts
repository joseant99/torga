export interface IProductosDormitorio {
    id?: number;
    nombre?: string;
    imagenContentType?: string;
    imagen?: any;
    categoriasDormiId?: number;
}

export class ProductosDormitorio implements IProductosDormitorio {
    constructor(
        public id?: number,
        public nombre?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public categoriasDormiId?: number
    ) {}
}
