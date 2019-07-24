import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';

@Component({
    selector: 'jhi-dimensiones-producto-detail',
    templateUrl: './dimensiones-producto-detail.component.html'
})
export class DimensionesProductoDetailComponent implements OnInit {
    dimensionesProducto: IDimensionesProducto;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dimensionesProducto }) => {
            this.dimensionesProducto = dimensionesProducto;
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
