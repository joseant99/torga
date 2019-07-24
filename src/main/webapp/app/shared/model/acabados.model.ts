import { IAcaProd } from 'app/shared/model//aca-prod.model';

export interface IAcabados {
    id?: number;
    nombre?: string;
    precio?: number;
    imagenFondoContentType?: string;
    imagenFondo?: any;
    acaProds?: IAcaProd[];
}

export class Acabados implements IAcabados {
    constructor(
        public id?: number,
        public nombre?: string,
        public precio?: number,
        public imagenFondoContentType?: string,
        public imagenFondo?: any,
        public acaProds?: IAcaProd[]
    ) {}
}
