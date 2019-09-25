import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPuertas } from 'app/shared/model/puertas.model';

@Component({
    selector: 'jhi-puertas-detail',
    templateUrl: './puertas-detail.component.html'
})
export class PuertasDetailComponent implements OnInit {
    puertas: IPuertas;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ puertas }) => {
            this.puertas = puertas;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
