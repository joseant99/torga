import { IProductosComposicion } from 'app/shared/model//productos-composicion.model';
import { IAcabados } from 'app/shared/model//acabados.model';

export interface IAcabadosComposicion {
    id?: number;
    productosComposicion?: IProductosComposicion;
    acabados?: IAcabados;
}

export class AcabadosComposicion implements IAcabadosComposicion {
    constructor(public id?: number, public productosComposicion?: IProductosComposicion, public acabados?: IAcabados) {}
}
