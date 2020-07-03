import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFPago } from 'app/shared/model/f-pago.model';
import { FPagoService } from './f-pago.service';

@Component({
    selector: 'jhi-f-pago-update',
    templateUrl: './f-pago-update.component.html'
})
export class FPagoUpdateComponent implements OnInit {
    fPago: IFPago;
    isSaving: boolean;

    constructor(protected fPagoService: FPagoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fPago }) => {
            this.fPago = fPago;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fPago.id !== undefined) {
            this.subscribeToSaveResponse(this.fPagoService.update(this.fPago));
        } else {
            this.subscribeToSaveResponse(this.fPagoService.create(this.fPago));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFPago>>) {
        result.subscribe((res: HttpResponse<IFPago>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
