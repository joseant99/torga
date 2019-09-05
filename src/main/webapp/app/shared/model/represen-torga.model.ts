import { IUser } from 'app/core/user/user.model';

export interface IRepresenTorga {
    id?: number;
    nombre?: string;
    apellidos?: string;
    email?: string;
    telefono?: string;
    user?: IUser;
}

export class RepresenTorga implements IRepresenTorga {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellidos?: string,
        public email?: string,
        public telefono?: string,
        public user?: IUser
    ) {}
}
