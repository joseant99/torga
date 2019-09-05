import { IRepresenTorga } from 'app/shared/model//represen-torga.model';
import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';

export interface IRepresentanteTienda {
    id?: number;
    represenTorga?: IRepresenTorga;
    datosUsuario?: IDatosUsuario;
}

export class RepresentanteTienda implements IRepresentanteTienda {
    constructor(public id?: number, public represenTorga?: IRepresenTorga, public datosUsuario?: IDatosUsuario) {}
}
