import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPuertasPrecios } from 'app/shared/model/puertas-precios.model';

@Component({
    selector: 'jhi-puertas-precios-detail',
    templateUrl: './puertas-precios-detail.component.html'
})
export class PuertasPreciosDetailComponent implements OnInit {
    puertasPrecios: IPuertasPrecios;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ puertasPrecios }) => {
            this.puertasPrecios = puertasPrecios;
        });
    }

    previousState() {
        window.history.back();
    }
}
