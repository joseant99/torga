import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';
import { PagosTorgaTiendasService } from './pagos-torga-tiendas.service';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { PagosTiendaService } from 'app/entities/pagos-tienda';

@Component({
    selector: 'jhi-pagos-torga-tiendas-update',
    templateUrl: './pagos-torga-tiendas-update.component.html'
})
export class PagosTorgaTiendasUpdateComponent implements OnInit {
    pagosTorgaTiendas: IPagosTorgaTiendas;
    isSaving: boolean;

    datosusuarios: IDatosUsuario[];

    pagostiendas: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected pagosTorgaTiendasService: PagosTorgaTiendasService,
        protected datosUsuarioService: DatosUsuarioService,
        protected pagosTiendaService: PagosTiendaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        var cont = 0;
        var pagos = [];
        this.activatedRoute.data.subscribe(({ pagosTorgaTiendas }) => {
            this.pagosTorgaTiendas = pagosTorgaTiendas;
        });
        this.datosUsuarioService.query().subscribe(
            (res: HttpResponse<IDatosUsuario[]>) => {
                this.datosusuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pagosTiendaService.query().subscribe(
            (res: HttpResponse<IPagosTienda[]>) => {
                for (let i = 0; i < res.body.length; i++) {
                    if (res.body[i]['datosUsuario']['user']['id'] == 3) {
                        pagos[cont] = res.body[i];
                        cont++;
                    }
                }
                this.pagostiendas = pagos;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pagosTorgaTiendas.id !== undefined) {
            this.subscribeToSaveResponse(this.pagosTorgaTiendasService.update(this.pagosTorgaTiendas));
        } else {
            this.subscribeToSaveResponse(this.pagosTorgaTiendasService.create(this.pagosTorgaTiendas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagosTorgaTiendas>>) {
        result.subscribe((res: HttpResponse<IPagosTorgaTiendas>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPagosTiendaById(index: number, item: IPagosTienda) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
