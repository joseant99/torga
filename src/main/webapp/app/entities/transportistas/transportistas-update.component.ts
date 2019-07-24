import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITransportistas } from 'app/shared/model/transportistas.model';
import { TransportistasService } from './transportistas.service';

@Component({
    selector: 'jhi-transportistas-update',
    templateUrl: './transportistas-update.component.html'
})
export class TransportistasUpdateComponent implements OnInit {
    transportistas: ITransportistas;
    isSaving: boolean;

    constructor(protected transportistasService: TransportistasService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportistas }) => {
            this.transportistas = transportistas;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transportistas.id !== undefined) {
            this.subscribeToSaveResponse(this.transportistasService.update(this.transportistas));
        } else {
            this.subscribeToSaveResponse(this.transportistasService.create(this.transportistas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransportistas>>) {
        result.subscribe((res: HttpResponse<ITransportistas>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
