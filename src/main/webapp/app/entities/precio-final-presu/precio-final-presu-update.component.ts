import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';
import { PrecioFinalPresuService } from './precio-final-presu.service';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { PresupuestoPedidoService } from 'app/entities/presupuesto-pedido';
import { IDireccionTiendas } from 'app/shared/model/direccion-tiendas.model';
import { DireccionTiendasService } from 'app/entities/direccion-tiendas';

@Component({
    selector: 'jhi-precio-final-presu-update',
    templateUrl: './precio-final-presu-update.component.html'
})
export class PrecioFinalPresuUpdateComponent implements OnInit {
    precioFinalPresu: IPrecioFinalPresu;
    isSaving: boolean;

    presupuestopedidos: IPresupuestoPedido[];

    direcciontiendas: IDireccionTiendas[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected precioFinalPresuService: PrecioFinalPresuService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected direccionTiendasService: DireccionTiendasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ precioFinalPresu }) => {
            this.precioFinalPresu = precioFinalPresu;
        });
        this.presupuestoPedidoService.query().subscribe(
            (res: HttpResponse<IPresupuestoPedido[]>) => {
                this.presupuestopedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.direccionTiendasService.query().subscribe(
            (res: HttpResponse<IDireccionTiendas[]>) => {
                this.direcciontiendas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.precioFinalPresu.id !== undefined) {
            this.subscribeToSaveResponse(this.precioFinalPresuService.update(this.precioFinalPresu));
        } else {
            this.subscribeToSaveResponse(this.precioFinalPresuService.create(this.precioFinalPresu));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrecioFinalPresu>>) {
        result.subscribe((res: HttpResponse<IPrecioFinalPresu>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPresupuestoPedidoById(index: number, item: IPresupuestoPedido) {
        return item.id;
    }

    trackDireccionTiendasById(index: number, item: IDireccionTiendas) {
        return item.id;
    }
}
