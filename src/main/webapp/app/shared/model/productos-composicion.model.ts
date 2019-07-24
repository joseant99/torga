import { IProductosDormitorio } from 'app/shared/model//productos-dormitorio.model';
import { IDimensionesProductoTipo } from 'app/shared/model//dimensiones-producto-tipo.model';
import { IAcabadosComposicion } from 'app/shared/model/acabados-composicion.model';
import { IComposicion } from 'app/shared/model//composicion.model';
import { ITipoProducto } from 'app/shared/model//tipo-producto.model';
import { ITiposApoyo } from 'app/shared/model//tipos-apoyo.model';

export interface IProductosComposicion {
    id?: number;
    productosDormitorio?: IProductosDormitorio;
    dimensionesProductoTipo?: IDimensionesProductoTipo;
    acabadosComposicions?: IAcabadosComposicion[];
    composicion?: IComposicion;
    tipoProducto?: ITipoProducto;
    tiposApoyo?: ITiposApoyo;
}

export class ProductosComposicion implements IProductosComposicion {
    constructor(
        public id?: number,
        public productosDormitorio?: IProductosDormitorio,
        public dimensionesProductoTipo?: IDimensionesProductoTipo,
        public acabadosComposicions?: IAcabadosComposicion[],
        public composicion?: IComposicion,
        public tipoProducto?: ITipoProducto,
        public tiposApoyo?: ITiposApoyo
    ) {}
}
