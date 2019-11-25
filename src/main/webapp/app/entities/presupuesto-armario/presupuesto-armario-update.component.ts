import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from './presupuesto-armario.service';
import { IArmario } from 'app/shared/model/armario.model';
import { ArmarioService } from 'app/entities/armario';
import { IAcabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from 'app/entities/acabados';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from 'app/entities/productos-presupuesto-pedidos';

@Component({
    selector: 'jhi-presupuesto-armario-update',
    templateUrl: './presupuesto-armario-update.component.html'
})
export class PresupuestoArmarioUpdateComponent implements OnInit {
    presupuestoArmario: IPresupuestoArmario;
    isSaving: boolean;

    armarios: IArmario[];

    acabados: IAcabados[];

    productospresupuestopedidos: IProductosPresupuestoPedidos[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected armarioService: ArmarioService,
        protected acabadosService: AcabadosService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ presupuestoArmario }) => {
            this.presupuestoArmario = presupuestoArmario;
        });
        this.armarioService.query().subscribe(
            (res: HttpResponse<IArmario[]>) => {
                this.armarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.presupuestoArmario.id !== undefined) {
            this.subscribeToSaveResponse(this.presupuestoArmarioService.update(this.presupuestoArmario));
        } else {
            this.subscribeToSaveResponse(this.presupuestoArmarioService.create(this.presupuestoArmario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoArmario>>) {
        result.subscribe((res: HttpResponse<IPresupuestoArmario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArmarioById(index: number, item: IArmario) {
        return item.id;
    }

    trackAcabadosById(index: number, item: IAcabados) {
        return item.id;
    }

    trackProductosPresupuestoPedidosById(index: number, item: IProductosPresupuestoPedidos) {
        return item.id;
    }
}
