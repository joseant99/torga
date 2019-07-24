import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from './estados.service';

@Component({
    selector: 'jhi-estados-update',
    templateUrl: './estados-update.component.html'
})
export class EstadosUpdateComponent implements OnInit {
    estados: IEstados;
    isSaving: boolean;

    constructor(protected estadosService: EstadosService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estados }) => {
            this.estados = estados;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estados.id !== undefined) {
            this.subscribeToSaveResponse(this.estadosService.update(this.estados));
        } else {
            this.subscribeToSaveResponse(this.estadosService.create(this.estados));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstados>>) {
        result.subscribe((res: HttpResponse<IEstados>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
