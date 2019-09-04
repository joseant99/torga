import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMedidasEspeciales } from 'app/shared/model/medidas-especiales.model';
import { MedidasEspecialesService } from './medidas-especiales.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-medidas-especiales-update',
    templateUrl: './medidas-especiales-update.component.html'
})
export class MedidasEspecialesUpdateComponent implements OnInit {
    medidasEspeciales: IMedidasEspeciales;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medidasEspeciales }) => {
            this.medidasEspeciales = medidasEspeciales;
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medidasEspeciales.id !== undefined) {
            this.subscribeToSaveResponse(this.medidasEspecialesService.update(this.medidasEspeciales));
        } else {
            this.subscribeToSaveResponse(this.medidasEspecialesService.create(this.medidasEspeciales));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedidasEspeciales>>) {
        result.subscribe((res: HttpResponse<IMedidasEspeciales>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
