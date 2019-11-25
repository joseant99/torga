import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';
import { PresupuestoArmarioInterioresService } from './presupuesto-armario-interiores.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from 'app/entities/presupuesto-armario';

@Component({
    selector: 'jhi-presupuesto-armario-interiores-update',
    templateUrl: './presupuesto-armario-interiores-update.component.html'
})
export class PresupuestoArmarioInterioresUpdateComponent implements OnInit {
    presupuestoArmarioInteriores: IPresupuestoArmarioInteriores;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    presupuestoarmarios: IPresupuestoArmario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected presupuestoArmarioInterioresService: PresupuestoArmarioInterioresService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ presupuestoArmarioInteriores }) => {
            this.presupuestoArmarioInteriores = presupuestoArmarioInteriores;
        });
        this.productosDormitorioService.query().subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.presupuestoArmarioService.query().subscribe(
            (res: HttpResponse<IPresupuestoArmario[]>) => {
                this.presupuestoarmarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.presupuestoArmarioInteriores.id !== undefined) {
            this.subscribeToSaveResponse(this.presupuestoArmarioInterioresService.update(this.presupuestoArmarioInteriores));
        } else {
            this.subscribeToSaveResponse(this.presupuestoArmarioInterioresService.create(this.presupuestoArmarioInteriores));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoArmarioInteriores>>) {
        result.subscribe(
            (res: HttpResponse<IPresupuestoArmarioInteriores>) => this.onSaveSuccess(),
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

    trackProductosDormitorioById(index: number, item: IProductosDormitorio) {
        return item.id;
    }

    trackPresupuestoArmarioById(index: number, item: IPresupuestoArmario) {
        return item.id;
    }
}
