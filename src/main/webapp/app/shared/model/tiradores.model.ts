export interface ITiradores {
    id?: number;
    imagenContentType?: string;
    imagen?: any;
    nombre?: string;
    precio?: number;
    altura?: number;
}

export class Tiradores implements ITiradores {
    constructor(
        public id?: number,
        public imagenContentType?: string,
        public imagen?: any,
        public nombre?: string,
        public precio?: number,
        public altura?: number
    ) {}
}
