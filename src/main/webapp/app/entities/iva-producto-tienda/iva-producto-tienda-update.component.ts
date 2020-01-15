import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';
import { IvaProductoTiendaService } from './iva-producto-tienda.service';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';

@Component({
    selector: 'jhi-iva-producto-tienda-update',
    templateUrl: './iva-producto-tienda-update.component.html'
})
export class IvaProductoTiendaUpdateComponent implements OnInit {
    ivaProductoTienda: IIvaProductoTienda;
    isSaving: boolean;

    datosusuarios: IDatosUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ivaProductoTiendaService: IvaProductoTiendaService,
        protected datosUsuarioService: DatosUsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ivaProductoTienda }) => {
            this.ivaProductoTienda = ivaProductoTienda;
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
        if (this.ivaProductoTienda.id !== undefined) {
            this.subscribeToSaveResponse(this.ivaProductoTiendaService.update(this.ivaProductoTienda));
        } else {
            this.subscribeToSaveResponse(this.ivaProductoTiendaService.create(this.ivaProductoTienda));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIvaProductoTienda>>) {
        result.subscribe((res: HttpResponse<IIvaProductoTienda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
