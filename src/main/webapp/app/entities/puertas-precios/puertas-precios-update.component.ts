import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPuertasPrecios } from 'app/shared/model/puertas-precios.model';
import { PuertasPreciosService } from './puertas-precios.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { ICasco } from 'app/shared/model/casco.model';
import { CascoService } from 'app/entities/casco';

@Component({
    selector: 'jhi-puertas-precios-update',
    templateUrl: './puertas-precios-update.component.html'
})
export class PuertasPreciosUpdateComponent implements OnInit {
    puertasPrecios: IPuertasPrecios;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    cascos: ICasco[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected puertasPreciosService: PuertasPreciosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected cascoService: CascoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ puertasPrecios }) => {
            this.puertasPrecios = puertasPrecios;
        });
        this.productosDormitorioService.query().subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cascoService.query().subscribe(
            (res: HttpResponse<ICasco[]>) => {
                this.cascos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.puertasPrecios.id !== undefined) {
            this.subscribeToSaveResponse(this.puertasPreciosService.update(this.puertasPrecios));
        } else {
            this.subscribeToSaveResponse(this.puertasPreciosService.create(this.puertasPrecios));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPuertasPrecios>>) {
        result.subscribe((res: HttpResponse<IPuertasPrecios>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCascoById(index: number, item: ICasco) {
        return item.id;
    }
}
