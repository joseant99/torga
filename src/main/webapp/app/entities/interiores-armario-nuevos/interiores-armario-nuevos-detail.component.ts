import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';

@Component({
    selector: 'jhi-interiores-armario-nuevos-detail',
    templateUrl: './interiores-armario-nuevos-detail.component.html'
})
export class InterioresArmarioNuevosDetailComponent implements OnInit {
    interioresArmarioNuevos: IInterioresArmarioNuevos;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interioresArmarioNuevos }) => {
            this.interioresArmarioNuevos = interioresArmarioNuevos;
        });
    }

    previousState() {
        window.history.back();
    }
}
