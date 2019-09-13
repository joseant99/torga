import { IInterioresArmarios } from 'app/shared/model//interiores-armarios.model';
import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IInteriorArmarioDentro {
    id?: number;
    imagenContentType?: string;
    imagen?: any;
    ancho?: number;
    precio?: number;
    nombre?: string;
    precioLuz?: number;
    interioresArmarios?: IInterioresArmarios;
    productosDormitorio?: IProductosDormitorio;
}

export class InteriorArmarioDentro implements IInteriorArmarioDentro {
    constructor(
        public id?: number,
        public imagenContentType?: string,
        public imagen?: any,
        public ancho?: number,
        public precio?: number,
        public nombre?: string,
        public precioLuz?: number,
        public interioresArmarios?: IInterioresArmarios,
        public productosDormitorio?: IProductosDormitorio
    ) {}
}
