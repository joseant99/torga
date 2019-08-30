import { IUser } from 'app/core/user/user.model';
import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';

export interface IVendedores {
    id?: number;
    user?: IUser;
    datosUsuario?: IDatosUsuario;
}

export class Vendedores implements IVendedores {
    constructor(public id?: number, public user?: IUser, public datosUsuario?: IDatosUsuario) {}
}
