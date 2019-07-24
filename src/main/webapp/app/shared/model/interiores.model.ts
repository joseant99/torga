import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IDimensionesProductoTipo } from 'app/shared/model//dimensiones-producto-tipo.model';

export interface IInteriores {
    id?: number;
    imagenContentType?: string;
    imagen?: any;
    productosDormitorio?: IProductosDormitorio;
    dimensionesProductoTipo?: IDimensionesProductoTipo;
}

export class Interiores implements IInteriores {
    constructor(
        public id?: number,
        public imagenContentType?: string,
        public imagen?: any,
        public productosDormitorio?: IProductosDormitorio,
        public dimensionesProductoTipo?: IDimensionesProductoTipo
    ) {}
}
