import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IExposicion } from 'app/shared/model/exposicion.model';
import { ExposicionService } from './exposicion.service';

@Component({
    selector: 'jhi-exposicion-update',
    templateUrl: './exposicion-update.component.html'
})
export class ExposicionUpdateComponent implements OnInit {
    exposicion: IExposicion;
    isSaving: boolean;

    constructor(protected exposicionService: ExposicionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ exposicion }) => {
            this.exposicion = exposicion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.exposicion.id !== undefined) {
            this.subscribeToSaveResponse(this.exposicionService.update(this.exposicion));
        } else {
            this.subscribeToSaveResponse(this.exposicionService.create(this.exposicion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExposicion>>) {
        result.subscribe((res: HttpResponse<IExposicion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
