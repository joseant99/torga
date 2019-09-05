import { IUser } from 'app/core/user/user.model';

export interface IRepresentantes {
    id?: number;
    nombre?: string;
    apellidos?: string;
    email?: string;
    telefono?: string;
    user?: IUser;
}

export class Representantes implements IRepresentantes {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellidos?: string,
        public email?: string,
        public telefono?: string,
        public user?: IUser
    ) {}
}
