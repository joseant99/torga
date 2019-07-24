import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepresentante } from 'app/shared/model/representante.model';

@Component({
    selector: 'jhi-representante-detail',
    templateUrl: './representante-detail.component.html'
})
export class RepresentanteDetailComponent implements OnInit {
    representante: IRepresentante;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ representante }) => {
            this.representante = representante;
        });
    }

    previousState() {
        window.history.back();
    }
}
