import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';
import { DimensionesProductoTipoService } from './dimensiones-producto-tipo.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { ITipoProducto } from 'app/shared/model/tipo-producto.model';
import { TipoProductoService } from 'app/entities/tipo-producto';

@Component({
    selector: 'jhi-dimensiones-producto-tipo-update',
    templateUrl: './dimensiones-producto-tipo-update.component.html'
})
export class DimensionesProductoTipoUpdateComponent implements OnInit {
    dimensionesProductoTipo: IDimensionesProductoTipo;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    tipoproductos: ITipoProducto[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected tipoProductoService: TipoProductoService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dimensionesProductoTipo }) => {
            this.dimensionesProductoTipo = dimensionesProductoTipo;
        });

        this.productosDormitorioService
            .query({
                size: 10000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => {
                    this.productosdormitorios = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.tipoProductoService.query().subscribe(
            (res: HttpResponse<ITipoProducto[]>) => {
                this.tipoproductos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.dimensionesProductoTipo, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dimensionesProductoTipo.id !== undefined) {
            this.subscribeToSaveResponse(this.dimensionesProductoTipoService.update(this.dimensionesProductoTipo));
        } else {
            this.subscribeToSaveResponse(this.dimensionesProductoTipoService.create(this.dimensionesProductoTipo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDimensionesProductoTipo>>) {
        result.subscribe(
            (res: HttpResponse<IDimensionesProductoTipo>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackTipoProductoById(index: number, item: ITipoProducto) {
        return item.id;
    }
}
