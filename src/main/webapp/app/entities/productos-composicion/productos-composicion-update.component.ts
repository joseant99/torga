import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProductosComposicion } from 'app/shared/model/productos-composicion.model';
import { ProductosComposicionService } from './productos-composicion.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';
import { DimensionesProductoTipoService } from 'app/entities/dimensiones-producto-tipo';
import { IComposicion } from 'app/shared/model/composicion.model';
import { ComposicionService } from 'app/entities/composicion';
import { ITipoProducto } from 'app/shared/model/tipo-producto.model';
import { TipoProductoService } from 'app/entities/tipo-producto';
import { ITiposApoyo } from 'app/shared/model/tipos-apoyo.model';
import { TiposApoyoService } from 'app/entities/tipos-apoyo';
import { IIluminacion } from 'app/shared/model/iluminacion.model';
import { IluminacionService } from 'app/entities/iluminacion';

@Component({
    selector: 'jhi-productos-composicion-update',
    templateUrl: './productos-composicion-update.component.html'
})
export class ProductosComposicionUpdateComponent implements OnInit {
    productosComposicion: IProductosComposicion;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    dimensionesproductotipos: IDimensionesProductoTipo[];

    composicions: IComposicion[];

    tipoproductos: ITipoProducto[];

    tiposapoyos: ITiposApoyo[];

    iluminacions: IIluminacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productosComposicionService: ProductosComposicionService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected composicionService: ComposicionService,
        protected tipoProductoService: TipoProductoService,
        protected tiposApoyoService: TiposApoyoService,
        protected iluminacionService: IluminacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productosComposicion }) => {
            this.productosComposicion = productosComposicion;
        });
        this.productosDormitorioService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.dimensionesProductoTipoService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<IDimensionesProductoTipo[]>) => {
                this.dimensionesproductotipos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.composicionService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<IComposicion[]>) => {
                this.composicions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoProductoService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<ITipoProducto[]>) => {
                this.tipoproductos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tiposApoyoService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<ITiposApoyo[]>) => {
                this.tiposapoyos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.iluminacionService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<IIluminacion[]>) => {
                this.iluminacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productosComposicion.id !== undefined) {
            this.subscribeToSaveResponse(this.productosComposicionService.update(this.productosComposicion));
        } else {
            this.subscribeToSaveResponse(this.productosComposicionService.create(this.productosComposicion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductosComposicion>>) {
        result.subscribe(
            (res: HttpResponse<IProductosComposicion>) => this.onSaveSuccess(),
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

    trackComposicionById(index: number, item: IComposicion) {
        return item.id;
    }

    trackTipoProductoById(index: number, item: ITipoProducto) {
        return item.id;
    }

    trackTiposApoyoById(index: number, item: ITiposApoyo) {
        return item.id;
    }

    trackIluminacionById(index: number, item: IIluminacion) {
        return item.id;
    }
}
