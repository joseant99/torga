import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITipoProducto } from 'app/shared/model/tipo-producto.model';
import { TipoProductoService } from './tipo-producto.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-tipo-producto-update',
    templateUrl: './tipo-producto-update.component.html'
})
export class TipoProductoUpdateComponent implements OnInit {
    tipoProducto: ITipoProducto;
    isSaving: boolean;
    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected tipoProductoService: TipoProductoService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.productosDormitorioService
            .query({
                size: 100000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => (this.productosdormitorios = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.tipoProducto, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoProducto.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoProductoService.update(this.tipoProducto));
        } else {
            this.subscribeToSaveResponse(this.tipoProductoService.create(this.tipoProducto));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoProducto>>) {
        result.subscribe((res: HttpResponse<ITipoProducto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
