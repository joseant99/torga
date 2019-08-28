import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIluminacion } from 'app/shared/model/iluminacion.model';

@Component({
    selector: 'jhi-iluminacion-detail',
    templateUrl: './iluminacion-detail.component.html'
})
export class IluminacionDetailComponent implements OnInit {
    iluminacion: IIluminacion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iluminacion }) => {
            this.iluminacion = iluminacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
