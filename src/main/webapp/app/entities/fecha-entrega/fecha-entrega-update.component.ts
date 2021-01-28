import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFecha_entrega } from 'app/shared/model/fecha-entrega.model';
import { Fecha_entregaService } from './fecha-entrega.service';

@Component({
    selector: 'jhi-fecha-entrega-update',
    templateUrl: './fecha-entrega-update.component.html'
})
export class Fecha_entregaUpdateComponent implements OnInit {
    fecha_entrega: IFecha_entrega;
    isSaving: boolean;

    constructor(protected fecha_entregaService: Fecha_entregaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fecha_entrega }) => {
            this.fecha_entrega = fecha_entrega;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fecha_entrega.id !== undefined) {
            this.subscribeToSaveResponse(this.fecha_entregaService.update(this.fecha_entrega));
        } else {
            this.subscribeToSaveResponse(this.fecha_entregaService.create(this.fecha_entrega));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFecha_entrega>>) {
        result.subscribe((res: HttpResponse<IFecha_entrega>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
