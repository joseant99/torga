import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IZonas } from 'app/shared/model/zonas.model';
import { ZonasService } from './zonas.service';

@Component({
    selector: 'jhi-zonas-update',
    templateUrl: './zonas-update.component.html'
})
export class ZonasUpdateComponent implements OnInit {
    zonas: IZonas;
    isSaving: boolean;

    constructor(protected zonasService: ZonasService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ zonas }) => {
            this.zonas = zonas;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.zonas.id !== undefined) {
            this.subscribeToSaveResponse(this.zonasService.update(this.zonas));
        } else {
            this.subscribeToSaveResponse(this.zonasService.create(this.zonas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IZonas>>) {
        result.subscribe((res: HttpResponse<IZonas>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
