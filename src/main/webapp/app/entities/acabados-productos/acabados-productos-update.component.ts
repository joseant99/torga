import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAcabados_Productos } from 'app/shared/model/acabados-productos.model';
import { Acabados_ProductosService } from './acabados-productos.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-acabados-productos-update',
    templateUrl: './acabados-productos-update.component.html'
})
export class Acabados_ProductosUpdateComponent implements OnInit {
    acabados_Productos: IAcabados_Productos;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected acabados_ProductosService: Acabados_ProductosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acabados_Productos }) => {
            this.acabados_Productos = acabados_Productos;
        });
        this.productosDormitorioService.query().subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acabados_Productos.id !== undefined) {
            this.subscribeToSaveResponse(this.acabados_ProductosService.update(this.acabados_Productos));
        } else {
            this.subscribeToSaveResponse(this.acabados_ProductosService.create(this.acabados_Productos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcabados_Productos>>) {
        result.subscribe((res: HttpResponse<IAcabados_Productos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductosDormitorioById(index: number, item: IProductosDormitorio) {
        return item.id;
    }
}
