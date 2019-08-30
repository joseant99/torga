import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { PagosTiendaService } from './pagos-tienda.service';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';

@Component({
    selector: 'jhi-pagos-tienda-update',
    templateUrl: './pagos-tienda-update.component.html'
})
export class PagosTiendaUpdateComponent implements OnInit {
    pagosTienda: IPagosTienda;
    isSaving: boolean;

    datosusuarios: IDatosUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected pagosTiendaService: PagosTiendaService,
        protected datosUsuarioService: DatosUsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pagosTienda }) => {
            this.pagosTienda = pagosTienda;
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
        if (this.pagosTienda.id !== undefined) {
            this.subscribeToSaveResponse(this.pagosTiendaService.update(this.pagosTienda));
        } else {
            this.subscribeToSaveResponse(this.pagosTiendaService.create(this.pagosTienda));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagosTienda>>) {
        result.subscribe((res: HttpResponse<IPagosTienda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
