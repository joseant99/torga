import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';

export interface IPrecioTienda {
    id?: number;
    precio?: number;
    datosUsuario?: IDatosUsuario;
}

export class PrecioTienda implements IPrecioTienda {
    constructor(public id?: number, public precio?: number, public datosUsuario?: IDatosUsuario) {}
}
