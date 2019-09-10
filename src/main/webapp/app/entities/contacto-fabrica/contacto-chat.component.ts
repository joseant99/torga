import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { AccountService } from 'app/core';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ContactoFabricaService } from './contacto-fabrica.service';
import { MensajesService } from '../mensajes/mensajes.service';

@Component({
    selector: 'jhi-contacto-fabrica',
    templateUrl: './contacto-chat.component.html'
})
export class ContactoChatComponent implements OnInit, OnDestroy {
    currentAccount: any;
    contactoFabricas: IContactoFabrica[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    mensajes: any;
    contactoOriginal: any;
    presupuestosTabla: any;
    pedidosTabla: any;
    incidenciasTabla: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    pedidos: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected contactoFabricaService: ContactoFabricaService,
        protected dataUtils: JhiDataUtils,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected mensajesService: MensajesService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {}

    loadAll() {
        var usuario = this.accountService.userIdentity;
        var presupuestos = [];
        var presupuestoTabla = [];
        var pedidosTabla = [];
        var cont = 0;
        var contPed = 0;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/contacto-fabrica'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/contacto-fabrica',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        var mensajes = [];
        var cont = 0;
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.activatedRoute.data.subscribe(({ contactoFabrica }) => {
            this.contactoOriginal = contactoFabrica;
            if (contactoFabrica['tipo'] == 1) {
                contactoFabrica['tipo'] = 'Presupuestos';
            }
            if (contactoFabrica['tipo'] == 2) {
                contactoFabrica['tipo'] = 'Pedidos';
            }
            if (contactoFabrica['tipo'] == 3) {
                contactoFabrica['tipo'] = 'Incidencias';
            }
            if (contactoFabrica['tipo'] == 4) {
                contactoFabrica['tipo'] = 'proyectos';
            }
            if (contactoFabrica['tipo'] == 5) {
                contactoFabrica['tipo'] = 'Sugerencias';
            }
            if (contactoFabrica['tipo'] == 0) {
                contactoFabrica['tipo'] = 'Otros';
            }
            this.contactoFabrica = contactoFabrica;
        });
        this.registerChangeInContactoFabricas();
        var contactoFabrica = this.contactoFabrica;
        var account = this.currentAccount;
        this.mensajesService
            .query({
                size: 100000
            })
            .subscribe(
                (res: HttpResponse<IMensajes[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['contactoFabrica']['id'] == contactoFabrica['id']) {
                            mensajes[cont] = res.body[i];
                            cont++;
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.mensajes = mensajes;
    }
    public mensajes1() {
        var contacto = this.contactoOriginal;
        var user = this.currentAccount;
        var mensaje = $('#textoMensaje').val();
        $('#mensajes').append('<p style="float:right;padding-left: 100%;">' + mensaje + '</p>');
        const mensajes = {
            texto: mensaje,
            contactoFabrica: contacto,
            user: user
        };
        this.subscribeToSaveResponse(this.mensajesService.create(mensajes));
        $('#textoMensaje').val('');
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContactoFabrica) {
        return item.id;
    }

    registerChangeInContactoFabricas() {
        this.eventSubscriber = this.eventManager.subscribe('contactoFabricaListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMensajes>>) {
        result.subscribe((res: HttpResponse<IMensajes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    protected paginateContactoFabricas(data: IContactoFabrica[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.contactoFabricas = data;
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
