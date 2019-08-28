import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';
import { IluminacionProdPrePedService } from './iluminacion-prod-pre-ped.service';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from 'app/entities/productos-presupuesto-pedidos';
import { IIluminacion } from 'app/shared/model/iluminacion.model';
import { IluminacionService } from 'app/entities/iluminacion';

@Component({
    selector: 'jhi-iluminacion-prod-pre-ped-update',
    templateUrl: './iluminacion-prod-pre-ped-update.component.html'
})
export class IluminacionProdPrePedUpdateComponent implements OnInit {
    iluminacionProdPrePed: IIluminacionProdPrePed;
    isSaving: boolean;

    productospresupuestopedidos: IProductosPresupuestoPedidos[];

    iluminacions: IIluminacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected iluminacionService: IluminacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ iluminacionProdPrePed }) => {
            this.iluminacionProdPrePed = iluminacionProdPrePed;
        });
        this.productosPresupuestoPedidosService.query().subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                this.productospresupuestopedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.iluminacionService.query().subscribe(
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
        if (this.iluminacionProdPrePed.id !== undefined) {
            this.subscribeToSaveResponse(this.iluminacionProdPrePedService.update(this.iluminacionProdPrePed));
        } else {
            this.subscribeToSaveResponse(this.iluminacionProdPrePedService.create(this.iluminacionProdPrePed));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIluminacionProdPrePed>>) {
        result.subscribe(
            (res: HttpResponse<IIluminacionProdPrePed>) => this.onSaveSuccess(),
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

    trackIluminacionById(index: number, item: IIluminacion) {
        return item.id;
    }
}
