import { IContactoFabrica } from 'app/shared/model//contacto-fabrica.model';
import { IUser } from 'app/core/user/user.model';

export interface IImagenesContactoFabrica {
    id?: number;
    imagenContentType?: string;
    imagen?: any;
    contactoFabrica?: IContactoFabrica;
    user?: IUser;
}

export class ImagenesContactoFabrica implements IImagenesContactoFabrica {
    constructor(
        public id?: number,
        public imagenContentType?: string,
        public imagen?: any,
        public contactoFabrica?: IContactoFabrica,
        public user?: IUser
    ) {}
}
