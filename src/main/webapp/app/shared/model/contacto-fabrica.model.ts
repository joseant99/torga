import { IUser } from 'app/core/user/user.model';

export interface IContactoFabrica {
    id?: number;
    fechaInicio?: string;
    tipo?: string;
    estado?: string;
    albaran?: string;
    factura?: string;
    codigo?: string;
    user?: IUser;
}

export class ContactoFabrica implements IContactoFabrica {
    constructor(
        public id?: number,
        public fechaInicio?: string,
        public tipo?: string,
        public estado?: string,
        public albaran?: string,
        public factura?: string,
        public codigo?: string,
        public user?: IUser
    ) {}
}
