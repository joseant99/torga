import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPuertas } from 'app/shared/model/puertas.model';
import { PuertasService } from './puertas.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-puertas-update',
    templateUrl: './puertas-update.component.html'
})
export class PuertasUpdateComponent implements OnInit {
    puertas: IPuertas;
    isSaving: boolean;
    puertas1: any;
    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected puertasService: PuertasService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        var armarios = [];
        var cont = 0;
        var puertas = [];
        var cont1 = 0;

        this.productosDormitorioService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['categoriasDormiId'] == 9) {
                            armarios[cont] = res.body[i];
                            cont++;
                        }
                    }
                    this.productosdormitorios = armarios;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.productosDormitorioService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['categoriasDormiId'] == 10) {
                            puertas[cont1] = res.body[i];
                            cont1++;
                        }
                    }
                    this.puertas1 = puertas;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ puertas }) => {
            this.puertas = puertas;
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
        this.dataUtils.clearInputImage(this.puertas, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.puertas.id !== undefined) {
            this.subscribeToSaveResponse(this.puertasService.update(this.puertas));
        } else {
            this.subscribeToSaveResponse(this.puertasService.create(this.puertas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPuertas>>) {
        result.subscribe((res: HttpResponse<IPuertas>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
