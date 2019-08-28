import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIluminacion } from 'app/shared/model/iluminacion.model';
import { IluminacionService } from './iluminacion.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';

@Component({
    selector: 'jhi-iluminacion-update',
    templateUrl: './iluminacion-update.component.html'
})
export class IluminacionUpdateComponent implements OnInit {
    iluminacion: IIluminacion;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected iluminacionService: IluminacionService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ iluminacion }) => {
            this.iluminacion = iluminacion;
        });
        this.productosDormitorioService.query().subscribe(
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
        if (this.iluminacion.id !== undefined) {
            this.subscribeToSaveResponse(this.iluminacionService.update(this.iluminacion));
        } else {
            this.subscribeToSaveResponse(this.iluminacionService.create(this.iluminacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIluminacion>>) {
        result.subscribe((res: HttpResponse<IIluminacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
