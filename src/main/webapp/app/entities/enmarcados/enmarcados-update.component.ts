import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEnmarcados } from 'app/shared/model/enmarcados.model';
import { EnmarcadosService } from './enmarcados.service';
import { IArmario } from 'app/shared/model/armario.model';
import { ArmarioService } from 'app/entities/armario';

@Component({
    selector: 'jhi-enmarcados-update',
    templateUrl: './enmarcados-update.component.html'
})
export class EnmarcadosUpdateComponent implements OnInit {
    enmarcados: IEnmarcados;
    isSaving: boolean;

    armarios: IArmario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected enmarcadosService: EnmarcadosService,
        protected armarioService: ArmarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ enmarcados }) => {
            this.enmarcados = enmarcados;
        });
        this.armarioService.query().subscribe(
            (res: HttpResponse<IArmario[]>) => {
                this.armarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.enmarcados.id !== undefined) {
            this.subscribeToSaveResponse(this.enmarcadosService.update(this.enmarcados));
        } else {
            this.subscribeToSaveResponse(this.enmarcadosService.create(this.enmarcados));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnmarcados>>) {
        result.subscribe((res: HttpResponse<IEnmarcados>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArmarioById(index: number, item: IArmario) {
        return item.id;
    }
}
