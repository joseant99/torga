import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICajeado } from 'app/shared/model/cajeado.model';

@Component({
    selector: 'jhi-cajeado-detail',
    templateUrl: './cajeado-detail.component.html'
})
export class CajeadoDetailComponent implements OnInit {
    cajeado: ICajeado;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cajeado }) => {
            this.cajeado = cajeado;
        });
    }

    previousState() {
        window.history.back();
    }
}
