import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAcabadosComposicion } from 'app/shared/model/acabados-composicion.model';
import { AcabadosComposicionService } from './acabados-composicion.service';
import { IProductosComposicion } from 'app/shared/model/productos-composicion.model';
import { ProductosComposicionService } from 'app/entities/productos-composicion';
import { IAcabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from 'app/entities/acabados';

@Component({
    selector: 'jhi-acabados-composicion-update',
    templateUrl: './acabados-composicion-update.component.html'
})
export class AcabadosComposicionUpdateComponent implements OnInit {
    acabadosComposicion: IAcabadosComposicion;
    isSaving: boolean;

    productoscomposicions: IProductosComposicion[];

    acabados: IAcabados[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected acabadosComposicionService: AcabadosComposicionService,
        protected productosComposicionService: ProductosComposicionService,
        protected acabadosService: AcabadosService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acabadosComposicion }) => {
            this.acabadosComposicion = acabadosComposicion;
        });
        this.productosComposicionService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosComposicion[]>) => {
                    this.productoscomposicions = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.acabadosService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IAcabados[]>) => {
                    this.acabados = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acabadosComposicion.id !== undefined) {
            this.subscribeToSaveResponse(this.acabadosComposicionService.update(this.acabadosComposicion));
        } else {
            this.subscribeToSaveResponse(this.acabadosComposicionService.create(this.acabadosComposicion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcabadosComposicion>>) {
        result.subscribe((res: HttpResponse<IAcabadosComposicion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProductosComposicionById(index: number, item: IProductosComposicion) {
        return item.id;
    }

    trackAcabadosById(index: number, item: IAcabados) {
        return item.id;
    }
}
