import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IInteriores } from 'app/shared/model/interiores.model';
import { InterioresService } from './interiores.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';
import { DimensionesProductoTipoService } from 'app/entities/dimensiones-producto-tipo';

@Component({
    selector: 'jhi-interiores-update',
    templateUrl: './interiores-update.component.html'
})
export class InterioresUpdateComponent implements OnInit {
    interiores: IInteriores;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    dimensionesproductotipos: IDimensionesProductoTipo[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected interioresService: InterioresService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ interiores }) => {
            this.interiores = interiores;
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
        this.dimensionesProductoTipoService.query().subscribe(
            (res: HttpResponse<IDimensionesProductoTipo[]>) => {
                this.dimensionesproductotipos = res.body;
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
        this.dataUtils.clearInputImage(this.interiores, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.interiores.id !== undefined) {
            this.subscribeToSaveResponse(this.interioresService.update(this.interiores));
        } else {
            this.subscribeToSaveResponse(this.interioresService.create(this.interiores));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInteriores>>) {
        result.subscribe((res: HttpResponse<IInteriores>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDimensionesProductoTipoById(index: number, item: IDimensionesProductoTipo) {
        return item.id;
    }
}
