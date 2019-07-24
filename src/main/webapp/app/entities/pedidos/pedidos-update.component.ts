import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPedidos } from 'app/shared/model/pedidos.model';
import { PedidosService } from './pedidos.service';
import { ILogistica } from 'app/shared/model/logistica.model';
import { LogisticaService } from 'app/entities/logistica';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { ReferenciaClientesService } from 'app/entities/referencia-clientes';

@Component({
    selector: 'jhi-pedidos-update',
    templateUrl: './pedidos-update.component.html'
})
export class PedidosUpdateComponent implements OnInit {
    pedidos: IPedidos;
    isSaving: boolean;

    logisticas: ILogistica[];

    referenciaclientes: IReferenciaClientes[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected pedidosService: PedidosService,
        protected logisticaService: LogisticaService,
        protected referenciaClientesService: ReferenciaClientesService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pedidos }) => {
            this.pedidos = pedidos;
        });
        this.logisticaService.query({ filter: 'pedidos(referenciacliente)-is-null' }).subscribe(
            (res: HttpResponse<ILogistica[]>) => {
                if (!this.pedidos.logistica || !this.pedidos.logistica.id) {
                    this.logisticas = res.body;
                } else {
                    this.logisticaService.find(this.pedidos.logistica.id).subscribe(
                        (subRes: HttpResponse<ILogistica>) => {
                            this.logisticas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.referenciaClientesService.query().subscribe(
            (res: HttpResponse<IReferenciaClientes[]>) => {
                this.referenciaclientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pedidos.id !== undefined) {
            this.subscribeToSaveResponse(this.pedidosService.update(this.pedidos));
        } else {
            this.subscribeToSaveResponse(this.pedidosService.create(this.pedidos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedidos>>) {
        result.subscribe((res: HttpResponse<IPedidos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLogisticaById(index: number, item: ILogistica) {
        return item.id;
    }

    trackReferenciaClientesById(index: number, item: IReferenciaClientes) {
        return item.id;
    }
}
