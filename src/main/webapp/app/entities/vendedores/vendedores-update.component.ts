import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVendedores } from 'app/shared/model/vendedores.model';
import { VendedoresService } from './vendedores.service';
import { IUser, UserService } from 'app/core';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';

@Component({
    selector: 'jhi-vendedores-update',
    templateUrl: './vendedores-update.component.html'
})
export class VendedoresUpdateComponent implements OnInit {
    vendedores: IVendedores;
    isSaving: boolean;

    users: IUser[];

    datosusuarios: IDatosUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected vendedoresService: VendedoresService,
        protected userService: UserService,
        protected datosUsuarioService: DatosUsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vendedores }) => {
            this.vendedores = vendedores;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.datosUsuarioService.query().subscribe(
            (res: HttpResponse<IDatosUsuario[]>) => {
                this.datosusuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vendedores.id !== undefined) {
            this.subscribeToSaveResponse(this.vendedoresService.update(this.vendedores));
        } else {
            this.subscribeToSaveResponse(this.vendedoresService.create(this.vendedores));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVendedores>>) {
        result.subscribe((res: HttpResponse<IVendedores>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDatosUsuarioById(index: number, item: IDatosUsuario) {
        return item.id;
    }
}
