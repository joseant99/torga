import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';

@Component({
    selector: 'jhi-precio-final-presu-detail',
    templateUrl: './precio-final-presu-detail.component.html'
})
export class PrecioFinalPresuDetailComponent implements OnInit {
    precioFinalPresu: IPrecioFinalPresu;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ precioFinalPresu }) => {
            this.precioFinalPresu = precioFinalPresu;
        });
    }

    previousState() {
        window.history.back();
    }
}
