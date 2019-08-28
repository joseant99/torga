import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';

@Component({
    selector: 'jhi-iluminacion-prod-pre-ped-detail',
    templateUrl: './iluminacion-prod-pre-ped-detail.component.html'
})
export class IluminacionProdPrePedDetailComponent implements OnInit {
    iluminacionProdPrePed: IIluminacionProdPrePed;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iluminacionProdPrePed }) => {
            this.iluminacionProdPrePed = iluminacionProdPrePed;
        });
    }

    previousState() {
        window.history.back();
    }
}
