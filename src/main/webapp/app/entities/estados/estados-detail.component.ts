import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstados } from 'app/shared/model/estados.model';

@Component({
    selector: 'jhi-estados-detail',
    templateUrl: './estados-detail.component.html'
})
export class EstadosDetailComponent implements OnInit {
    estados: IEstados;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estados }) => {
            this.estados = estados;
        });
    }

    previousState() {
        window.history.back();
    }
}
