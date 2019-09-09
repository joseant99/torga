import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { AccountService } from 'app/core';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ContactoFabricaService } from './contacto-fabrica.service';

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
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
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
    public quitarActive(id) {
        if (id == 1) {
            $('#home').attr('class', 'active show');
            $('#menu1').removeAttr('class');
            $('#menu1').attr('class', 'tab-pane fade');
            $('#menu2').removeAttr('class');
            $('#menu2').attr('class', 'tab-pane fade');
            $('#menu3').removeAttr('class');
            $('#menu3').attr('class', 'tab-pane fade');
            $('#menu4').removeAttr('class');
            $('#menu4').attr('class', 'tab-pane fade');
            $('#menu5').removeAttr('class');
            $('#menu5').attr('class', 'tab-pane fade');
        }
        if (id == 2) {
            $('#menu1').attr('class', 'active show');
            $('#home').removeAttr('class');
            $('#home').attr('class', 'tab-pane fade');
            $('#menu2').removeAttr('class');
            $('#menu2').attr('class', 'tab-pane fade');
            $('#menu3').removeAttr('class');
            $('#menu3').attr('class', 'tab-pane fade');
            $('#menu4').removeAttr('class');
            $('#menu4').attr('class', 'tab-pane fade');
            $('#menu5').removeAttr('class');
            $('#menu5').attr('class', 'tab-pane fade');
        }
        if (id == 3) {
            $('#menu2').attr('class', 'active show');
            $('#home').removeAttr('class');
            $('#home').attr('class', 'tab-pane fade');
            $('#menu1').removeAttr('class');
            $('#menu1').attr('class', 'tab-pane fade');
            $('#menu3').removeAttr('class');
            $('#menu3').attr('class', 'tab-pane fade');
            $('#menu4').removeAttr('class');
            $('#menu4').attr('class', 'tab-pane fade');
            $('#menu5').removeAttr('class');
            $('#menu5').attr('class', 'tab-pane fade');
        }
        if (id == 4) {
            $('#menu3').attr('class', 'active show');
            $('#home').removeAttr('class');
            $('#home').attr('class', 'tab-pane fade');
            $('#menu2').removeAttr('class');
            $('#menu2').attr('class', 'tab-pane fade');
            $('#menu1').removeAttr('class');
            $('#menu1').attr('class', 'tab-pane fade');
            $('#menu4').removeAttr('class');
            $('#menu4').attr('class', 'tab-pane fade');
            $('#menu5').removeAttr('class');
            $('#menu5').attr('class', 'tab-pane fade');
        }
        if (id == 5) {
            $('#menu4').attr('class', 'active show');
            $('#home').removeAttr('class');
            $('#home').attr('class', 'tab-pane fade');
            $('#menu2').removeAttr('class');
            $('#menu2').attr('class', 'tab-pane fade');
            $('#menu1').removeAttr('class');
            $('#menu1').attr('class', 'tab-pane fade');
            $('#menu3').removeAttr('class');
            $('#menu3').attr('class', 'tab-pane fade');
            $('#menu5').removeAttr('class');
            $('#menu5').attr('class', 'tab-pane fade');
        }
        if (id == 6) {
            $('#menu5').attr('class', 'active show');
            $('#home').removeAttr('class');
            $('#home').attr('class', 'tab-pane fade');
            $('#menu2').removeAttr('class');
            $('#menu2').attr('class', 'tab-pane fade');
            $('#menu1').removeAttr('class');
            $('#menu1').attr('class', 'tab-pane fade');
            $('#menu3').removeAttr('class');
            $('#menu3').attr('class', 'tab-pane fade');
            $('#menu4').removeAttr('class');
            $('#menu4').attr('class', 'tab-pane fade');
        }
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
    }
    public mensajes() {
        var mensaje = $('#textoMensaje').val();
        $('#mensajes').append('<p style="float:right;padding-left: 100%;">' + mensaje + '</p>');
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
    public llenarModal(id) {
        var pedidos = this.pedidos;
        var usuario = this.currentAccount;
        if (id == 1) {
            $('#relacion').val('Presupuestos');
            for (let i = 0; i < pedidos.length; i++) {
                if (usuario['id'] == pedidos[i]['user']['id'] && pedidos[i]['pedido'] == 0) {
                    $('#opciones').append('<option value="' + pedidos[i]['id'] + '">' + pedidos[i]['codigo'] + '</option>');
                }
            }
            $('#opciones').append();
        }
        if (id == 2) {
            $('#relacion').val('Pedidos');
            for (let i = 0; i < pedidos.length; i++) {
                if (usuario['id'] == pedidos[i]['user']['id'] && pedidos[i]['pedido'] == 1) {
                    $('#opciones').append('<option value="' + pedidos[i]['id'] + '">' + pedidos[i]['codigo'] + '</option>');
                }
            }
        }
        if (id == 3) {
            $('#relacion').val('Presupuestos');
            $('#opciones').append();
        }
        if (id == 4) {
            $('#relacion').val('Presupuestos');
            $('#opciones').append();
        }
        if (id == 5) {
            $('#relacion').val('Presupuestos');
            $('#opciones').append();
        }
        if (id == 6) {
            $('#relacion').val('Presupuestos');
            $('#opciones').append();
        }
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    public crearChat() {
        var tipo = $('#relacion').val();
        var numero;
        var idPed = $('#opciones').val();
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        if (tipo == 'Presupuestos') {
            numero = 1;
            const contacto = {
                fechaInicio: output,
                tipo: numero,
                codigo: idPed,
                user: this.currentAccount
            };
            this.subscribeToSaveResponse(this.contactoFabricaService.create(contacto));
        }
        if (tipo == 'Pedidos') {
            numero = 2;
            const contacto = {
                fechaInicio: output,
                tipo: numero,
                codigo: idPed,
                user: this.currentAccount
            };
            this.subscribeToSaveResponse(this.contactoFabricaService.create(contacto));
        }
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoFabrica>>) {
        result.subscribe((res: HttpResponse<IContactoFabrica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
