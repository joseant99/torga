import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IArmario } from 'app/shared/model//armario.model';
import { ICasco } from 'app/shared/model//casco.model';

export interface IInterioresArmarioNuevos {
    id?: number;
    nombre?: string;
    ancho?: number;
    precio?: number;
    luz?: number;
    a?: number;
    b?: number;
    c?: number;
    d?: number;
    e?: number;
    piloto?: number;
    productosDormitorio?: IProductosDormitorio;
    armario?: IArmario;
    casco?: ICasco;
}

export class InterioresArmarioNuevos implements IInterioresArmarioNuevos {
    constructor(
        public id?: number,
        public nombre?: string,
        public ancho?: number,
        public precio?: number,
        public luz?: number,
        public a?: number,
        public b?: number,
        public c?: number,
        public d?: number,
        public e?: number,
        public piloto?: number,
        public productosDormitorio?: IProductosDormitorio,
        public armario?: IArmario,
        public casco?: ICasco
    ) {}
}
