import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';

@Component({
    selector: 'jhi-dimensiones-producto-tipo-detail',
    templateUrl: './dimensiones-producto-tipo-detail.component.html'
})
export class DimensionesProductoTipoDetailComponent implements OnInit {
    dimensionesProductoTipo: IDimensionesProductoTipo;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dimensionesProductoTipo }) => {
            this.dimensionesProductoTipo = dimensionesProductoTipo;
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
