import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { CategoriasDormiService } from 'app/entities/categorias-dormi';
import { IPuertas } from 'app/shared/model/puertas.model';
import { PuertasService } from 'app/entities/puertas';

@Component({
    selector: 'jhi-productos-dormitorio-update',
    templateUrl: './productos-dormitorio-update.component.html'
})
export class ProductosDormitorioUpdateComponent implements OnInit {
    productosDormitorio: IProductosDormitorio;
    isSaving: boolean;

    categoriasdormis: ICategoriasDormi[];

    puertas: IPuertas[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected categoriasDormiService: CategoriasDormiService,
        protected puertasService: PuertasService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productosDormitorio }) => {
            this.productosDormitorio = productosDormitorio;
        });
        this.categoriasDormiService.query().subscribe(
            (res: HttpResponse<ICategoriasDormi[]>) => {
                this.categoriasdormis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.puertasService.query().subscribe(
            (res: HttpResponse<IPuertas[]>) => {
                this.puertas = res.body;
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
        this.dataUtils.clearInputImage(this.productosDormitorio, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productosDormitorio.id !== undefined) {
            this.subscribeToSaveResponse(this.productosDormitorioService.update(this.productosDormitorio));
        } else {
            this.subscribeToSaveResponse(this.productosDormitorioService.create(this.productosDormitorio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductosDormitorio>>) {
        result.subscribe((res: HttpResponse<IProductosDormitorio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCategoriasDormiById(index: number, item: ICategoriasDormi) {
        return item.id;
    }

    trackPuertasById(index: number, item: IPuertas) {
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
