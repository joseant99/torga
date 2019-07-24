import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-presupuesto-pedido-update',
    templateUrl: './presupuesto-pedido-update.component.html'
})
export class PresupuestoPedidoUpdateComponent implements OnInit {
    presupuestoPedido: IPresupuestoPedido;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ presupuestoPedido }) => {
            this.presupuestoPedido = presupuestoPedido;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.presupuestoPedido.id !== undefined) {
            this.subscribeToSaveResponse(this.presupuestoPedidoService.update(this.presupuestoPedido));
        } else {
            this.subscribeToSaveResponse(this.presupuestoPedidoService.create(this.presupuestoPedido));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
