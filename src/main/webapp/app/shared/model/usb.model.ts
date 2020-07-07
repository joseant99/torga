import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';

export interface IUsb {
    id?: number;
    mensaje?: string;
    precio?: number;
    productosDormitorio?: IProductosDormitorio;
}

export class Usb implements IUsb {
    constructor(public id?: number, public mensaje?: string, public precio?: number, public productosDormitorio?: IProductosDormitorio) {}
}
