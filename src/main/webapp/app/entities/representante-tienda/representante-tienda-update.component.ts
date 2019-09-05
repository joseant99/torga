import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { RepresentanteTiendaService } from './representante-tienda.service';
import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
import { RepresenTorgaService } from 'app/entities/represen-torga';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';

@Component({
    selector: 'jhi-representante-tienda-update',
    templateUrl: './representante-tienda-update.component.html'
})
export class RepresentanteTiendaUpdateComponent implements OnInit {
    representanteTienda: IRepresentanteTienda;
    isSaving: boolean;

    representorgas: IRepresenTorga[];

    datosusuarios: IDatosUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected representanteTiendaService: RepresentanteTiendaService,
        protected represenTorgaService: RepresenTorgaService,
        protected datosUsuarioService: DatosUsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ representanteTienda }) => {
            this.representanteTienda = representanteTienda;
        });
        this.represenTorgaService.query().subscribe(
            (res: HttpResponse<IRepresenTorga[]>) => {
                this.representorgas = res.body;
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
        if (this.representanteTienda.id !== undefined) {
            this.subscribeToSaveResponse(this.representanteTiendaService.update(this.representanteTienda));
        } else {
            this.subscribeToSaveResponse(this.representanteTiendaService.create(this.representanteTienda));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresentanteTienda>>) {
        result.subscribe((res: HttpResponse<IRepresentanteTienda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRepresenTorgaById(index: number, item: IRepresenTorga) {
        return item.id;
    }

    trackDatosUsuarioById(index: number, item: IDatosUsuario) {
        return item.id;
    }
}
