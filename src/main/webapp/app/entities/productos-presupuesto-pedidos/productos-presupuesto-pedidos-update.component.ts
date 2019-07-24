import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from './productos-presupuesto-pedidos.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';
import { DimensionesProductoTipoService } from 'app/entities/dimensiones-producto-tipo';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { PresupuestoPedidoService } from 'app/entities/presupuesto-pedido';
import { ITipoProducto } from 'app/shared/model/tipo-producto.model';
import { TipoProductoService } from 'app/entities/tipo-producto';
import { ITiposApoyo } from 'app/shared/model/tipos-apoyo.model';
import { TiposApoyoService } from 'app/entities/tipos-apoyo';

@Component({
    selector: 'jhi-productos-presupuesto-pedidos-update',
    templateUrl: './productos-presupuesto-pedidos-update.component.html'
})
export class ProductosPresupuestoPedidosUpdateComponent implements OnInit {
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    dimensionesproductotipos: IDimensionesProductoTipo[];

    presupuestopedidos: IPresupuestoPedido[];

    tipoproductos: ITipoProducto[];

    tiposapoyos: ITiposApoyo[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected tipoProductoService: TipoProductoService,
        protected tiposApoyoService: TiposApoyoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productosPresupuestoPedidos }) => {
            this.productosPresupuestoPedidos = productosPresupuestoPedidos;
        });
        this.productosDormitorioService.query().subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.dimensionesProductoTipoService.query().subscribe(
            (res: HttpResponse<IDimensionesProductoTipo[]>) => {
                this.dimensionesproductotipos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.presupuestoPedidoService.query().subscribe(
            (res: HttpResponse<IPresupuestoPedido[]>) => {
                this.presupuestopedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoProductoService.query().subscribe(
            (res: HttpResponse<ITipoProducto[]>) => {
                this.tipoproductos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tiposApoyoService.query().subscribe(
            (res: HttpResponse<ITiposApoyo[]>) => {
                this.tiposapoyos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productosPresupuestoPedidos.id !== undefined) {
            this.subscribeToSaveResponse(this.productosPresupuestoPedidosService.update(this.productosPresupuestoPedidos));
        } else {
            this.subscribeToSaveResponse(this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess(),
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

    trackProductosDormitorioById(index: number, item: IProductosDormitorio) {
        return item.id;
    }

    trackDimensionesProductoTipoById(index: number, item: IDimensionesProductoTipo) {
        return item.id;
    }

    trackPresupuestoPedidoById(index: number, item: IPresupuestoPedido) {
        return item.id;
    }

    trackTipoProductoById(index: number, item: ITipoProducto) {
        return item.id;
    }

    trackTiposApoyoById(index: number, item: ITiposApoyo) {
        return item.id;
    }
}
