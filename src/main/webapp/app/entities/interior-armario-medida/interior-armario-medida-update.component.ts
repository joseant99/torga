import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';
import { InteriorArmarioMedidaService } from './interior-armario-medida.service';
import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from 'app/entities/presupuesto-armario';

@Component({
    selector: 'jhi-interior-armario-medida-update',
    templateUrl: './interior-armario-medida-update.component.html'
})
export class InteriorArmarioMedidaUpdateComponent implements OnInit {
    interiorArmarioMedida: IInteriorArmarioMedida;
    isSaving: boolean;

    presupuestoarmarios: IPresupuestoArmario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected interiorArmarioMedidaService: InteriorArmarioMedidaService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ interiorArmarioMedida }) => {
            this.interiorArmarioMedida = interiorArmarioMedida;
        });
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
        if (this.interiorArmarioMedida.id !== undefined) {
            this.subscribeToSaveResponse(this.interiorArmarioMedidaService.update(this.interiorArmarioMedida));
        } else {
            this.subscribeToSaveResponse(this.interiorArmarioMedidaService.create(this.interiorArmarioMedida));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInteriorArmarioMedida>>) {
        result.subscribe(
            (res: HttpResponse<IInteriorArmarioMedida>) => this.onSaveSuccess(),
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

    trackPresupuestoArmarioById(index: number, item: IPresupuestoArmario) {
        return item.id;
    }
}
