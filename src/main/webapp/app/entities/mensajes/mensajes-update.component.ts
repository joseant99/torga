import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMensajes } from 'app/shared/model/mensajes.model';
import { MensajesService } from './mensajes.service';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from 'app/entities/productos-presupuesto-pedidos';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { ContactoFabricaService } from 'app/entities/contacto-fabrica';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-mensajes-update',
    templateUrl: './mensajes-update.component.html'
})
export class MensajesUpdateComponent implements OnInit {
    mensajes: IMensajes;
    isSaving: boolean;

    productospresupuestopedidos: IProductosPresupuestoPedidos[];

    contactofabricas: IContactoFabrica[];

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mensajesService: MensajesService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected contactoFabricaService: ContactoFabricaService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mensajes }) => {
            this.mensajes = mensajes;
        });
        this.productosPresupuestoPedidosService.query().subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                this.productospresupuestopedidos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.contactoFabricaService.query().subscribe(
            (res: HttpResponse<IContactoFabrica[]>) => {
                this.contactofabricas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mensajes.id !== undefined) {
            this.subscribeToSaveResponse(this.mensajesService.update(this.mensajes));
        } else {
            this.subscribeToSaveResponse(this.mensajesService.create(this.mensajes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMensajes>>) {
        result.subscribe((res: HttpResponse<IMensajes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackContactoFabricaById(index: number, item: IContactoFabrica) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
