import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IDatosUsuario } from 'app/shared/model//datos-usuario.model';

export interface IPrecioTiendaProductos {
    id?: number;
    porcentaje?: number;
    productosDormitorio?: IProductosDormitorio;
    datosUsuario?: IDatosUsuario;
}

export class PrecioTiendaProductos implements IPrecioTiendaProductos {
    constructor(
        public id?: number,
        public porcentaje?: number,
        public productosDormitorio?: IProductosDormitorio,
        public datosUsuario?: IDatosUsuario
    ) {}
}
