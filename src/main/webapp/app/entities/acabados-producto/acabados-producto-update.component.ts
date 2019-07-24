import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAcabadosProducto } from 'app/shared/model/acabados-producto.model';
import { AcabadosProductoService } from './acabados-producto.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-acabados-producto-update',
    templateUrl: './acabados-producto-update.component.html'
})
export class AcabadosProductoUpdateComponent implements OnInit {
    acabadosProducto: IAcabadosProducto;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected acabadosProductoService: AcabadosProductoService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acabadosProducto }) => {
            this.acabadosProducto = acabadosProducto;
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
        if (this.acabadosProducto.id !== undefined) {
            this.subscribeToSaveResponse(this.acabadosProductoService.update(this.acabadosProducto));
        } else {
            this.subscribeToSaveResponse(this.acabadosProductoService.create(this.acabadosProducto));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcabadosProducto>>) {
        result.subscribe((res: HttpResponse<IAcabadosProducto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
