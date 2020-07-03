import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRepreGCompra } from 'app/shared/model/repre-g-compra.model';
import { RepreGCompraService } from './repre-g-compra.service';

@Component({
    selector: 'jhi-repre-g-compra-update',
    templateUrl: './repre-g-compra-update.component.html'
})
export class RepreGCompraUpdateComponent implements OnInit {
    repreGCompra: IRepreGCompra;
    isSaving: boolean;

    constructor(protected repreGCompraService: RepreGCompraService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ repreGCompra }) => {
            this.repreGCompra = repreGCompra;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.repreGCompra.id !== undefined) {
            this.subscribeToSaveResponse(this.repreGCompraService.update(this.repreGCompra));
        } else {
            this.subscribeToSaveResponse(this.repreGCompraService.create(this.repreGCompra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepreGCompra>>) {
        result.subscribe((res: HttpResponse<IRepreGCompra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
