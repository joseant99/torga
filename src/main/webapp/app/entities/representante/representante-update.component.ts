import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRepresentante } from 'app/shared/model/representante.model';
import { RepresentanteService } from './representante.service';

@Component({
    selector: 'jhi-representante-update',
    templateUrl: './representante-update.component.html'
})
export class RepresentanteUpdateComponent implements OnInit {
    representante: IRepresentante;
    isSaving: boolean;

    constructor(protected representanteService: RepresentanteService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ representante }) => {
            this.representante = representante;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.representante.id !== undefined) {
            this.subscribeToSaveResponse(this.representanteService.update(this.representante));
        } else {
            this.subscribeToSaveResponse(this.representanteService.create(this.representante));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresentante>>) {
        result.subscribe((res: HttpResponse<IRepresentante>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
