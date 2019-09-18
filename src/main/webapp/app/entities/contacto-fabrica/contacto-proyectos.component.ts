import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { AccountService } from 'app/core';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ContactoFabricaService } from './contacto-fabrica.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-contacto-fabrica',
    templateUrl: './contacto-proyectos.component.html'
})
export class ContactoProyectosComponent implements OnInit, OnDestroy {
    currentAccount: any;
    contactoFabricas: IContactoFabrica[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    presupuestoRojo: any;
    isSaving: boolean;
    links: any;
    totalItems: any;
    queryCount: any;
    presupuestosTabla: any;
    incidenciasTabla: any;
    pedidosTabla: any;
    itemsPerPage: any;
    abajoPre: any;
    otrosTabla: any;
    sugerenciasTabla: any;
    proyectosTabla: any;
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
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        var usuario = this.accountService.userIdentity;
        var presupuestos = [];
        var presupuestoTabla = [];
        var pedidosTabla = [];
        var incidenciasTabla = [];
        var proyectosTabla = [];
        var sugerenciasTabla = [];
        var otrosTabla = [];
        var cont = 0;
        var contPed = 0;
        var contInc = 0;
        var contProy = 0;
        var contSug = 0;
        var contOtros = 0;
        var contPre = 0;
        var sesion = JSON.parse(sessionStorage.getItem('alertaChat'));
        this.contactoFabricaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    this.paginateContactoFabricas(res.body, res.headers);
                    for (let k = 0; k < res.body.length; k++) {
                        if (usuario['firstName'] == 'Administrator') {
                            if (res.body[k]['tipo'] == '1') {
                                presupuestoTabla[cont] = res.body[k];
                                cont++;
                                this.abajoPre = 1;
                            }
                            if (res.body[k]['tipo'] == '2') {
                                pedidosTabla[contPed] = res.body[k];
                                contPed;
                            }
                            if (res.body[k]['tipo'] == '3') {
                                incidenciasTabla[contInc] = res.body[k];
                                contInc++;
                            }

                            if (res.body[k]['tipo'] == '4') {
                                proyectosTabla[contProy] = res.body[k];
                                contProy++;
                            }
                            if (res.body[k]['tipo'] == '5') {
                                sugerenciasTabla[contSug] = res.body[k];
                                contSug++;
                            }
                            if (res.body[k]['tipo'] == '6') {
                                otrosTabla[contOtros] = res.body[k];
                                contOtros++;
                            }
                        } else {
                            if (sesion != undefined && cont == 0) {
                                if (sesion['tipo'] == '1') {
                                    presupuestoTabla[0] = sesion;
                                    this.presupuestoRojo = 1;
                                    $('#presupuestos').css({ color: 'red' });
                                    sessionStorage.removeItem('alertaChat');
                                    cont++;
                                    contPre++;
                                }
                            }
                            if (cont == 0) {
                                cont++;
                            }

                            if (usuario['id'] == res.body[k]['user']['id']) {
                                if (res.body[k]['tipo'] == '1') {
                                    if (sesion != undefined) {
                                        if (res.body[k]['id'] != sesion['id']) {
                                            presupuestoTabla[contPre] = res.body[k];
                                            contPre++;
                                            this.abajoPre = 0;
                                        }
                                    } else {
                                        presupuestoTabla[contPre] = res.body[k];
                                        contPre++;
                                        this.abajoPre = 1;
                                        sessionStorage.removeItem('alertaChat');
                                    }
                                }
                                if (res.body[k]['tipo'] == '2') {
                                    pedidosTabla[contPed] = res.body[k];
                                    contPed++;
                                }
                                if (res.body[k]['tipo'] == '3') {
                                    incidenciasTabla[contInc] = res.body[k];
                                    contInc++;
                                }

                                if (res.body[k]['tipo'] == '4') {
                                    proyectosTabla[contProy] = res.body[k];
                                    contProy++;
                                }
                                if (res.body[k]['tipo'] == '5') {
                                    sugerenciasTabla[contSug] = res.body[k];
                                    contSug++;
                                }
                                if (res.body[k]['tipo'] == '6') {
                                    otrosTabla[contOtros] = res.body[k];
                                    contOtros++;
                                }
                            }
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.presupuestosTabla = presupuestoTabla;
        this.incidenciasTabla = incidenciasTabla;
        this.proyectosTabla = proyectosTabla;
        this.sugerenciasTabla = sugerenciasTabla;
        this.otrosTabla = otrosTabla;
        this.pedidosTabla = pedidosTabla;
        this.presupuestoPedidoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IPresupuestoPedido[]>) => {
                for (let i = 0; i < res.body.length; i++) {
                    presupuestos[i] = res.body[i];
                }
            });
        this.pedidos = presupuestos;
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
        this.registerChangeInContactoFabricas();
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
            $('#modal #relacion').val('Presupuestos');
            for (let i = 0; i < pedidos.length; i++) {
                if (usuario['id'] == pedidos[i]['user']['id'] && pedidos[i]['pedido'] == 0) {
                    $('#opciones').append('<option value="' + pedidos[i]['id'] + '">' + pedidos[i]['codigo'] + '</option>');
                }
            }
            $('#opciones').append();
        }
        if (id == 2) {
            $('#modal #relacion').val('Pedidos');
            for (let i = 0; i < pedidos.length; i++) {
                if (usuario['id'] == pedidos[i]['user']['id'] && pedidos[i]['pedido'] == 1) {
                    $('#opciones').append('<option value="' + pedidos[i]['id'] + '">' + pedidos[i]['codigo'] + '</option>');
                }
            }
        }
        if (id == 3) {
            $('#relacion').val('Incidencias');
            $('#opciones').append();
        }
        if (id == 4) {
            $('#modalOtros #relacion').val('Proyectos');
        }
        if (id == 5) {
            $('#modalOtros #relacion').val('Sugerencias');
        }
        if (id == 6) {
            $('#modalOtros #relacion').val('Otros');
        }
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    public crearChat(id) {
        if (id == 1) {
            var tipo = $('#modal #relacion').val();
            var numero;
            var idPed;
            idPed = $('#modal #opciones').val();
        }
        if (id == 3) {
            var tipo = $('#modalOtros #relacion').val();
            var numero;
        }

        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output;
        output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
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
        if (tipo == 'Incidencias') {
            numero = 3;
            const contacto = {
                fechaInicio: output,
                tipo: numero,
                codigo: idPed,
                user: this.currentAccount
            };
            this.subscribeToSaveResponse(this.contactoFabricaService.create(contacto));
        }
        if (tipo == 'Proyectos') {
            numero = 4;
            const contacto = {
                fechaInicio: output,
                tipo: numero,
                codigo: 'Proy' + this.currentAccount['id'] + numero,
                user: this.currentAccount
            };
            this.subscribeToSaveResponse(this.contactoFabricaService.create(contacto));
        }
        if (tipo == 'Sugerencias') {
            numero = 5;
            const contacto = {
                fechaInicio: output,
                tipo: numero,
                codigo: 'Sug' + this.currentAccount['id'] + numero,
                user: this.currentAccount
            };
            this.subscribeToSaveResponse(this.contactoFabricaService.create(contacto));
        }
        if (tipo == 'Otros') {
            numero = 6;
            const contacto = {
                fechaInicio: output,
                tipo: numero,
                codigo: 'Otros' + this.currentAccount['id'] + numero,
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
