import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExposicion } from 'app/shared/model/exposicion.model';

@Component({
    selector: 'jhi-exposicion-detail',
    templateUrl: './exposicion-detail.component.html'
})
export class ExposicionDetailComponent implements OnInit {
    exposicion: IExposicion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ exposicion }) => {
            this.exposicion = exposicion;
        });
    }

    previousState() {
        window.history.back();
    }
}
