import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnmarcados } from 'app/shared/model/enmarcados.model';

@Component({
    selector: 'jhi-enmarcados-detail',
    templateUrl: './enmarcados-detail.component.html'
})
export class EnmarcadosDetailComponent implements OnInit {
    enmarcados: IEnmarcados;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enmarcados }) => {
            this.enmarcados = enmarcados;
        });
    }

    previousState() {
        window.history.back();
    }
}
