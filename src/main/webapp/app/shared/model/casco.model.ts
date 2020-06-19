import { IArmario } from 'app/shared/model//armario.model';

export interface ICasco {
    id?: number;
    ancho?: number;
    alto?: number;
    precio?: number;
    precioCostado?: number;
    anchoMin?: number;
    anchoMax?: number;
    altoMin?: number;
    altoMax?: number;
    codigo?: string;
    piloto?: number;
    armario?: IArmario;
}

export class Casco implements ICasco {
    constructor(
        public id?: number,
        public ancho?: number,
        public alto?: number,
        public precio?: number,
        public precioCostado?: number,
        public anchoMin?: number,
        public anchoMax?: number,
        public altoMin?: number,
        public altoMax?: number,
        public codigo?: string,
        public piloto?: number,
        public armario?: IArmario
    ) {}
}
