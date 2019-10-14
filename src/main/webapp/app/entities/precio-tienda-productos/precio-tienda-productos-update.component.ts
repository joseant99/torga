import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';
import { PrecioTiendaProductosService } from './precio-tienda-productos.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';

@Component({
    selector: 'jhi-precio-tienda-productos-update',
    templateUrl: './precio-tienda-productos-update.component.html'
})
export class PrecioTiendaProductosUpdateComponent implements OnInit {
    precioTiendaProductos: IPrecioTiendaProductos;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    datosusuarios: IDatosUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected datosUsuarioService: DatosUsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ precioTiendaProductos }) => {
            this.precioTiendaProductos = precioTiendaProductos;
        });
        this.productosDormitorioService.query().subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
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
        if (this.precioTiendaProductos.id !== undefined) {
            this.subscribeToSaveResponse(this.precioTiendaProductosService.update(this.precioTiendaProductos));
        } else {
            this.subscribeToSaveResponse(this.precioTiendaProductosService.create(this.precioTiendaProductos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrecioTiendaProductos>>) {
        result.subscribe(
            (res: HttpResponse<IPrecioTiendaProductos>) => this.onSaveSuccess(),
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

    trackDatosUsuarioById(index: number, item: IDatosUsuario) {
        return item.id;
    }
}
