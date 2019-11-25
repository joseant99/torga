import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';
import { PresupuestoArmarioPuertasService } from './presupuesto-armario-puertas.service';
import { IAcabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from 'app/entities/acabados';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from 'app/entities/presupuesto-armario';

@Component({
    selector: 'jhi-presupuesto-armario-puertas-update',
    templateUrl: './presupuesto-armario-puertas-update.component.html'
})
export class PresupuestoArmarioPuertasUpdateComponent implements OnInit {
    presupuestoArmarioPuertas: IPresupuestoArmarioPuertas;
    isSaving: boolean;

    acabados: IAcabados[];

    productosdormitorios: IProductosDormitorio[];

    presupuestoarmarios: IPresupuestoArmario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        protected acabadosService: AcabadosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ presupuestoArmarioPuertas }) => {
            this.presupuestoArmarioPuertas = presupuestoArmarioPuertas;
        });
        this.acabadosService.query().subscribe(
            (res: HttpResponse<IAcabados[]>) => {
                this.acabados = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.presupuestoArmarioPuertas.id !== undefined) {
            this.subscribeToSaveResponse(this.presupuestoArmarioPuertasService.update(this.presupuestoArmarioPuertas));
        } else {
            this.subscribeToSaveResponse(this.presupuestoArmarioPuertasService.create(this.presupuestoArmarioPuertas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoArmarioPuertas>>) {
        result.subscribe(
            (res: HttpResponse<IPresupuestoArmarioPuertas>) => this.onSaveSuccess(),
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

    trackAcabadosById(index: number, item: IAcabados) {
        return item.id;
    }

    trackProductosDormitorioById(index: number, item: IProductosDormitorio) {
        return item.id;
    }

    trackPresupuestoArmarioById(index: number, item: IPresupuestoArmario) {
        return item.id;
    }
}
