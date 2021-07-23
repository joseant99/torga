import { IPresupuestoArmario } from 'app/shared/model//presupuesto-armario.model';

export interface IInteriorArmarioMedida {
    id?: number;
    numeroHueco?: number;
    est1?: number;
    est2?: number;
    est3?: number;
    est4?: number;
    est5?: number;
    est6?: number;
    est7?: number;
    est8?: number;
    est9?: number;
    est10?: number;
    tubo1?: number;
    tubo2?: number;
    tubo3?: number;
    cajSue1?: number;
    cajSue2?: number;
    cajSue3?: number;
    cajSue4?: number;
    cajSue5?: number;
    hang?: number;
    camisero?: number;
    estCris1?: number;
    estCris2?: number;
    estCris3?: number;
    estCris4?: number;
    estCris5?: number;
    estCris6?: number;
    estCris7?: number;
    estCris8?: number;
    estCris9?: number;
    estCris10?: number;
    cajonVol1?: number;
    cajonVol2?: number;
    cajonVol3?: number;
    presupuestoArmario?: IPresupuestoArmario;
}

export class InteriorArmarioMedida implements IInteriorArmarioMedida {
    constructor(
        public id?: number,
        public numeroHueco?: number,
        public est1?: number,
        public est2?: number,
        public est3?: number,
        public est4?: number,
        public est5?: number,
        public est6?: number,
        public est7?: number,
        public est8?: number,
        public est9?: number,
        public est10?: number,
        public tubo1?: number,
        public tubo2?: number,
        public tubo3?: number,
        public cajSue1?: number,
        public cajSue2?: number,
        public cajSue3?: number,
        public cajSue4?: number,
        public cajSue5?: number,
        public hang?: number,
        public camisero?: number,
        public estCris1?: number,
        public estCris2?: number,
        public estCris3?: number,
        public estCris4?: number,
        public estCris5?: number,
        public estCris6?: number,
        public estCris7?: number,
        public estCris8?: number,
        public estCris9?: number,
        public estCris10?: number,
        public cajonVol1?: number,
        public cajonVol2?: number,
        public cajonVol3?: number,
        public presupuestoArmario?: IPresupuestoArmario
    ) {}
}
