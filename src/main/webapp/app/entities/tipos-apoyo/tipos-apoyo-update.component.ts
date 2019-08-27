import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITiposApoyo } from 'app/shared/model/tipos-apoyo.model';
import { TiposApoyoService } from './tipos-apoyo.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';
import { DimensionesProductoService } from 'app/entities/dimensiones-producto';

@Component({
    selector: 'jhi-tipos-apoyo-update',
    templateUrl: './tipos-apoyo-update.component.html'
})
export class TiposApoyoUpdateComponent implements OnInit {
    tiposApoyo: ITiposApoyo;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    dimensionesproductos: IDimensionesProducto[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected tiposApoyoService: TiposApoyoService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected dimensionesProductoService: DimensionesProductoService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tiposApoyo }) => {
            this.tiposApoyo = tiposApoyo;
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
        this.dimensionesProductoService.query().subscribe(
            (res: HttpResponse<IDimensionesProducto[]>) => {
                this.dimensionesproductos = res.body;
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
        this.dataUtils.clearInputImage(this.tiposApoyo, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tiposApoyo.id !== undefined) {
            this.subscribeToSaveResponse(this.tiposApoyoService.update(this.tiposApoyo));
        } else {
            this.subscribeToSaveResponse(this.tiposApoyoService.create(this.tiposApoyo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITiposApoyo>>) {
        result.subscribe((res: HttpResponse<ITiposApoyo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDimensionesProductoById(index: number, item: IDimensionesProducto) {
        return item.id;
    }
}
