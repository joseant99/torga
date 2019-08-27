import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { AcabadosProductosPresupuestoPedidoService } from './acabados-productos-presupuesto-pedido.service';
import { IAcabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from 'app/entities/acabados';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from 'app/entities/productos-presupuesto-pedidos';

@Component({
    selector: 'jhi-acabados-productos-presupuesto-pedido-update',
    templateUrl: './acabados-productos-presupuesto-pedido-update.component.html'
})
export class AcabadosProductosPresupuestoPedidoUpdateComponent implements OnInit {
    acabadosProductosPresupuestoPedido: IAcabadosProductosPresupuestoPedido;
    isSaving: boolean;

    acabados: IAcabados[];

    productospresupuestopedidos: IProductosPresupuestoPedidos[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected acabadosService: AcabadosService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acabadosProductosPresupuestoPedido }) => {
            this.acabadosProductosPresupuestoPedido = acabadosProductosPresupuestoPedido;
        });
        this.acabadosService.query().subscribe(
            (res: HttpResponse<IAcabados[]>) => {
                this.acabados = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.acabadosProductosPresupuestoPedido.id !== undefined) {
            this.subscribeToSaveResponse(this.acabadosProductosPresupuestoPedidoService.update(this.acabadosProductosPresupuestoPedido));
        } else {
            this.subscribeToSaveResponse(this.acabadosProductosPresupuestoPedidoService.create(this.acabadosProductosPresupuestoPedido));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcabadosProductosPresupuestoPedido>>) {
        result.subscribe(
            (res: HttpResponse<IAcabadosProductosPresupuestoPedido>) => this.onSaveSuccess(),
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

    trackAcabadosById(index: number, item: IAcabados) {
        return item.id;
    }

    trackProductosPresupuestoPedidosById(index: number, item: IProductosPresupuestoPedidos) {
        return item.id;
    }
}
