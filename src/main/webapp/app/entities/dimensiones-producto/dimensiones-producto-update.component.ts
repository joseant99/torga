import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';
import { DimensionesProductoService } from './dimensiones-producto.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-dimensiones-producto-update',
    templateUrl: './dimensiones-producto-update.component.html'
})
export class DimensionesProductoUpdateComponent implements OnInit {
    dimensionesProducto: IDimensionesProducto;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected dimensionesProductoService: DimensionesProductoService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dimensionesProducto }) => {
            this.dimensionesProducto = dimensionesProducto;
        });
        this.productosDormitorioService.query().subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productosDormitorioService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => {
                    this.productosdormitorios = res.body;
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
        this.dataUtils.clearInputImage(this.dimensionesProducto, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dimensionesProducto.id !== undefined) {
            this.subscribeToSaveResponse(this.dimensionesProductoService.update(this.dimensionesProducto));
        } else {
            this.subscribeToSaveResponse(this.dimensionesProductoService.create(this.dimensionesProducto));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDimensionesProducto>>) {
        result.subscribe((res: HttpResponse<IDimensionesProducto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
