import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';
import { IPagosTienda } from 'app/shared/model//pagos-tienda.model';

export interface IPagosTorgaTiendas {
    id?: number;
    grupo?: string;
    datosUsuario?: IDatosUsuario;
    pagosTiendas?: IPagosTienda[];
}

export class PagosTorgaTiendas implements IPagosTorgaTiendas {
    constructor(public id?: number, public grupo?: string, public datosUsuario?: IDatosUsuario, public pagosTiendas?: IPagosTienda[]) {}
}
