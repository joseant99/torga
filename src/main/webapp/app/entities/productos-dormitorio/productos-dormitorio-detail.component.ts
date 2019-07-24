import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';

@Component({
    selector: 'jhi-productos-dormitorio-detail',
    templateUrl: './productos-dormitorio-detail.component.html'
})
export class ProductosDormitorioDetailComponent implements OnInit {
    productosDormitorio: IProductosDormitorio;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosDormitorio }) => {
            this.productosDormitorio = productosDormitorio;
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
