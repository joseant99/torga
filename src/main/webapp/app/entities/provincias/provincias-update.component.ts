import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from './provincias.service';

@Component({
    selector: 'jhi-provincias-update',
    templateUrl: './provincias-update.component.html'
})
export class ProvinciasUpdateComponent implements OnInit {
    provincias: IProvincias;
    isSaving: boolean;

    constructor(protected provinciasService: ProvinciasService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ provincias }) => {
            this.provincias = provincias;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.provincias.id !== undefined) {
            this.subscribeToSaveResponse(this.provinciasService.update(this.provincias));
        } else {
            this.subscribeToSaveResponse(this.provinciasService.create(this.provincias));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvincias>>) {
        result.subscribe((res: HttpResponse<IProvincias>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
