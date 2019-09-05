import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDatosCliente } from 'app/shared/model/datos-cliente.model';
import { DatosClienteService } from './datos-cliente.service';
import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from 'app/entities/provincias';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { MunicipiosService } from 'app/entities/municipios';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { PresupuestoPedidoService } from 'app/entities/presupuesto-pedido';

@Component({
    selector: 'jhi-datos-cliente-update',
    templateUrl: './datos-cliente-update.component.html'
})
export class DatosClienteUpdateComponent implements OnInit {
    datosCliente: IDatosCliente;
    isSaving: boolean;

    provincias: IProvincias[];

    municipios: IMunicipios[];

    presupuestopedidos: IPresupuestoPedido[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected datosClienteService: DatosClienteService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ datosCliente }) => {
            this.datosCliente = datosCliente;
        });
        this.provinciasService.query().subscribe(
            (res: HttpResponse<IProvincias[]>) => {
                this.provincias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.municipiosService.query().subscribe(
            (res: HttpResponse<IMunicipios[]>) => {
                this.municipios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.presupuestoPedidoService.query().subscribe(
            (res: HttpResponse<IPresupuestoPedido[]>) => {
                this.presupuestopedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.datosCliente.id !== undefined) {
            this.subscribeToSaveResponse(this.datosClienteService.update(this.datosCliente));
        } else {
            this.subscribeToSaveResponse(this.datosClienteService.create(this.datosCliente));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDatosCliente>>) {
        result.subscribe((res: HttpResponse<IDatosCliente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProvinciasById(index: number, item: IProvincias) {
        return item.id;
    }

    trackMunicipiosById(index: number, item: IMunicipios) {
        return item.id;
    }

    trackPresupuestoPedidoById(index: number, item: IPresupuestoPedido) {
        return item.id;
    }
}
