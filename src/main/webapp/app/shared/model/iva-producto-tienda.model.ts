import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';

export interface IIvaProductoTienda {
    id?: number;
    iva?: number;
    datosUsuario?: IDatosUsuario;
}

export class IvaProductoTienda implements IIvaProductoTienda {
    constructor(public id?: number, public iva?: number, public datosUsuario?: IDatosUsuario) {}
}
