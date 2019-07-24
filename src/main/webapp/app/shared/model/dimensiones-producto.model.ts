export interface IDimensionesProducto {
    id?: number;
    ancho?: number;
    alto?: number;
    fondo?: number;
    mensaje?: string;
    imagenContentType?: string;
    imagen?: any;
    precio?: number;
    anchoIdeal?: number;
    productosDormitorioId?: number;
}

export class DimensionesProducto implements IDimensionesProducto {
    constructor(
        public id?: number,
        public ancho?: number,
        public alto?: number,
        public fondo?: number,
        public mensaje?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public precio?: number,
        public anchoIdeal?: number,
        public productosDormitorioId?: number
    ) {}
}
