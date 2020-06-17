import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICajeado } from 'app/shared/model/cajeado.model';
import { CajeadoService } from './cajeado.service';

@Component({
    selector: 'jhi-cajeado-update',
    templateUrl: './cajeado-update.component.html'
})
export class CajeadoUpdateComponent implements OnInit {
    cajeado: ICajeado;
    isSaving: boolean;

    constructor(protected cajeadoService: CajeadoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cajeado }) => {
            this.cajeado = cajeado;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cajeado.id !== undefined) {
            this.subscribeToSaveResponse(this.cajeadoService.update(this.cajeado));
        } else {
            this.subscribeToSaveResponse(this.cajeadoService.create(this.cajeado));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICajeado>>) {
        result.subscribe((res: HttpResponse<ICajeado>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
