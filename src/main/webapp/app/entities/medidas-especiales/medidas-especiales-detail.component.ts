import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedidasEspeciales } from 'app/shared/model/medidas-especiales.model';

@Component({
    selector: 'jhi-medidas-especiales-detail',
    templateUrl: './medidas-especiales-detail.component.html'
})
export class MedidasEspecialesDetailComponent implements OnInit {
    medidasEspeciales: IMedidasEspeciales;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medidasEspeciales }) => {
            this.medidasEspeciales = medidasEspeciales;
        });
    }

    previousState() {
        window.history.back();
    }
}
