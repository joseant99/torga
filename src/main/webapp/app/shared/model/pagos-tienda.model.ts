import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';
import { IPagosTorgaTiendas } from 'app/shared/model//pagos-torga-tiendas.model';

export interface IPagosTienda {
    id?: number;
    pago?: string;
    descuento?: string;
    precioTienda?: number;
    datosUsuario?: IDatosUsuario;
    pagosTorgaTiendas?: IPagosTorgaTiendas[];
}

export class PagosTienda implements IPagosTienda {
    constructor(
        public id?: number,
        public pago?: string,
        public descuento?: string,
        public precioTienda?: number,
        public datosUsuario?: IDatosUsuario,
        public pagosTorgaTiendas?: IPagosTorgaTiendas[]
    ) {}
}
