export interface IFPago {
    id?: number;
    descripcion?: string;
    vencimientos?: string;
    d1?: number;
    d2?: number;
    d3?: number;
    d4?: number;
    d5?: number;
    d6?: number;
    d7?: number;
    d8?: number;
    dTopp?: string;
}

export class FPago implements IFPago {
    constructor(
        public id?: number,
        public descripcion?: string,
        public vencimientos?: string,
        public d1?: number,
        public d2?: number,
        public d3?: number,
        public d4?: number,
        public d5?: number,
        public d6?: number,
        public d7?: number,
        public d8?: number,
        public dTopp?: string
    ) {}
}
