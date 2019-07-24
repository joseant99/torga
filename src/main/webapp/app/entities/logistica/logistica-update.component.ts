import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ILogistica } from 'app/shared/model/logistica.model';
import { LogisticaService } from './logistica.service';
import { IPedidos } from 'app/shared/model/pedidos.model';
import { PedidosService } from 'app/entities/pedidos';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { ReferenciaClientesService } from 'app/entities/referencia-clientes';
import { ITransportistas } from 'app/shared/model/transportistas.model';
import { TransportistasService } from 'app/entities/transportistas';
import { IEstados } from 'app/shared/model/estados.model';
import { EstadosService } from 'app/entities/estados';

@Component({
    selector: 'jhi-logistica-update',
    templateUrl: './logistica-update.component.html'
})
export class LogisticaUpdateComponent implements OnInit {
    logistica: ILogistica;
    isSaving: boolean;

    pedidos: IPedidos[];

    referenciaclientes: IReferenciaClientes[];
    transportistas: ITransportistas[];
    estados: IEstados[];
    fechaEntregaDp: any;
    fechaPedidoDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected logisticaService: LogisticaService,
        protected pedidosService: PedidosService,
        protected referenciaClientesService: ReferenciaClientesService,
        protected transportistasService: TransportistasService,
        protected estadosService: EstadosService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ logistica }) => {
            this.logistica = logistica;
        });
        this.pedidosService.query().subscribe(
            (res: HttpResponse<IPedidos[]>) => {
                this.pedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.referenciaClientesService.query().subscribe(
            (res: HttpResponse<IReferenciaClientes[]>) => {
                this.referenciaclientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.transportistasService.query().subscribe(
            (res: HttpResponse<ITransportistas[]>) => {
                this.transportistas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.estadosService.query().subscribe(
            (res: HttpResponse<IEstados[]>) => {
                this.estados = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.logistica.id !== undefined) {
            this.subscribeToSaveResponse(this.logisticaService.update(this.logistica));
        } else {
            this.subscribeToSaveResponse(this.logisticaService.create(this.logistica));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogistica>>) {
        result.subscribe((res: HttpResponse<ILogistica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEstadosById(index: number, item: IEstados) {
        return item.id;
    }
    trackTransportistasById(index: number, item: ITransportistas) {
        return item.id;
    }
    trackPedidosById(index: number, item: IPedidos) {
        return item.id;
    }

    trackReferenciaClientesById(index: number, item: IReferenciaClientes) {
        return item.id;
    }
}
