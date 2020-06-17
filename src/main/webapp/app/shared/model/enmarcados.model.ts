import { IArmario } from 'app/shared/model//armario.model';

export interface IEnmarcados {
    id?: number;
    codigo?: string;
    precio?: number;
    anchoMin?: number;
    anchoMax?: number;
    armario?: IArmario;
}

export class Enmarcados implements IEnmarcados {
    constructor(
        public id?: number,
        public codigo?: string,
        public precio?: number,
        public anchoMin?: number,
        public anchoMax?: number,
        public armario?: IArmario
    ) {}
}
