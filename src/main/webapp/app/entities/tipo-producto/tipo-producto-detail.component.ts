import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITipoProducto } from 'app/shared/model/tipo-producto.model';

@Component({
    selector: 'jhi-tipo-producto-detail',
    templateUrl: './tipo-producto-detail.component.html'
})
export class TipoProductoDetailComponent implements OnInit {
    tipoProducto: ITipoProducto;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoProducto }) => {
            this.tipoProducto = tipoProducto;
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
