import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IInterioresArmarios } from 'app/shared/model/interiores-armarios.model';
import { InterioresArmariosService } from './interiores-armarios.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-interiores-armarios-update',
    templateUrl: './interiores-armarios-update.component.html'
})
export class InterioresArmariosUpdateComponent implements OnInit {
    interioresArmarios: IInterioresArmarios;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected interioresArmariosService: InterioresArmariosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        var prods = [];
        var cont = 0;
        this.activatedRoute.data.subscribe(({ interioresArmarios }) => {
            this.interioresArmarios = interioresArmarios;
        });

        this.productosDormitorioService
            .query({
                size: 10000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['categoriasDormiId'] == 9) {
                            prods[cont] = res.body[i];
                            cont++;
                        }
                    }
                    this.productosdormitorios = prods;
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
        this.dataUtils.clearInputImage(this.interioresArmarios, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.interioresArmarios.id !== undefined) {
            this.subscribeToSaveResponse(this.interioresArmariosService.update(this.interioresArmarios));
        } else {
            this.subscribeToSaveResponse(this.interioresArmariosService.create(this.interioresArmarios));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInterioresArmarios>>) {
        result.subscribe((res: HttpResponse<IInterioresArmarios>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
