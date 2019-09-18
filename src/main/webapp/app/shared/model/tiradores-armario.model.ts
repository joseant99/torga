export interface ITiradoresArmario {
    id?: number;
    imagenContentType?: string;
    imagen?: any;
    nombre?: string;
    precio?: number;
    altura?: number;
}

export class TiradoresArmario implements ITiradoresArmario {
    constructor(
        public id?: number,
        public imagenContentType?: string,
        public imagen?: any,
        public nombre?: string,
        public precio?: number,
        public altura?: number
    ) {}
}
