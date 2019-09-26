import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrecioTienda } from 'app/shared/model/precio-tienda.model';
import { PrecioTiendaService } from './precio-tienda.service';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';

@Component({
    selector: 'jhi-precio-tienda-update',
    templateUrl: './precio-tienda-update.component.html'
})
export class PrecioTiendaUpdateComponent implements OnInit {
    precioTienda: IPrecioTienda;
    isSaving: boolean;

    datosusuarios: IDatosUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected precioTiendaService: PrecioTiendaService,
        protected datosUsuarioService: DatosUsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ precioTienda }) => {
            this.precioTienda = precioTienda;
        });
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
        if (this.precioTienda.id !== undefined) {
            this.subscribeToSaveResponse(this.precioTiendaService.update(this.precioTienda));
        } else {
            this.subscribeToSaveResponse(this.precioTiendaService.create(this.precioTienda));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrecioTienda>>) {
        result.subscribe((res: HttpResponse<IPrecioTienda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDatosUsuarioById(index: number, item: IDatosUsuario) {
        return item.id;
    }
}
