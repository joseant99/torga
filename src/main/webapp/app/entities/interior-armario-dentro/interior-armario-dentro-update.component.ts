import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IInteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';
import { InteriorArmarioDentroService } from './interior-armario-dentro.service';
import { IInterioresArmarios } from 'app/shared/model/interiores-armarios.model';
import { InterioresArmariosService } from 'app/entities/interiores-armarios';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-interior-armario-dentro-update',
    templateUrl: './interior-armario-dentro-update.component.html'
})
export class InteriorArmarioDentroUpdateComponent implements OnInit {
    interiorArmarioDentro: IInteriorArmarioDentro;
    isSaving: boolean;

    interioresarmarios: IInterioresArmarios[];

    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected interiorArmarioDentroService: InteriorArmarioDentroService,
        protected interioresArmariosService: InterioresArmariosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ interiorArmarioDentro }) => {
            this.interiorArmarioDentro = interiorArmarioDentro;
        });
        this.interioresArmariosService.query().subscribe(
            (res: HttpResponse<IInterioresArmarios[]>) => {
                this.interioresarmarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.dataUtils.clearInputImage(this.interiorArmarioDentro, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.interiorArmarioDentro.id !== undefined) {
            this.subscribeToSaveResponse(this.interiorArmarioDentroService.update(this.interiorArmarioDentro));
        } else {
            this.subscribeToSaveResponse(this.interiorArmarioDentroService.create(this.interiorArmarioDentro));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInteriorArmarioDentro>>) {
        result.subscribe(
            (res: HttpResponse<IInteriorArmarioDentro>) => this.onSaveSuccess(),
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

    trackInterioresArmariosById(index: number, item: IInterioresArmarios) {
        return item.id;
    }

    trackProductosDormitorioById(index: number, item: IProductosDormitorio) {
        return item.id;
    }
}
