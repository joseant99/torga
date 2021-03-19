import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICoordenadas } from 'app/shared/model/coordenadas.model';
import { CoordenadasService } from './coordenadas.service';

@Component({
    selector: 'jhi-coordenadas-update',
    templateUrl: './coordenadas-update.component.html'
})
export class CoordenadasUpdateComponent implements OnInit {
    coordenadas: ICoordenadas;
    isSaving: boolean;

    constructor(protected coordenadasService: CoordenadasService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ coordenadas }) => {
            this.coordenadas = coordenadas;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.coordenadas.id !== undefined) {
            this.subscribeToSaveResponse(this.coordenadasService.update(this.coordenadas));
        } else {
            this.subscribeToSaveResponse(this.coordenadasService.create(this.coordenadas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoordenadas>>) {
        result.subscribe((res: HttpResponse<ICoordenadas>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
