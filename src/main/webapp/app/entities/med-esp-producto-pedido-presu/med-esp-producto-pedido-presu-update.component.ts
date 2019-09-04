import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';
import { MedEspProductoPedidoPresuService } from './med-esp-producto-pedido-presu.service';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from 'app/entities/productos-presupuesto-pedidos';

@Component({
    selector: 'jhi-med-esp-producto-pedido-presu-update',
    templateUrl: './med-esp-producto-pedido-presu-update.component.html'
})
export class MedEspProductoPedidoPresuUpdateComponent implements OnInit {
    medEspProductoPedidoPresu: IMedEspProductoPedidoPresu;
    isSaving: boolean;

    productospresupuestopedidos: IProductosPresupuestoPedidos[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medEspProductoPedidoPresu }) => {
            this.medEspProductoPedidoPresu = medEspProductoPedidoPresu;
        });
        this.productosPresupuestoPedidosService.query().subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                this.productospresupuestopedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medEspProductoPedidoPresu.id !== undefined) {
            this.subscribeToSaveResponse(this.medEspProductoPedidoPresuService.update(this.medEspProductoPedidoPresu));
        } else {
            this.subscribeToSaveResponse(this.medEspProductoPedidoPresuService.create(this.medEspProductoPedidoPresu));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedEspProductoPedidoPresu>>) {
        result.subscribe(
            (res: HttpResponse<IMedEspProductoPedidoPresu>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackProductosPresupuestoPedidosById(index: number, item: IProductosPresupuestoPedidos) {
        return item.id;
    }
}
