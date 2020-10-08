import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';
import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';

import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { AccountService } from 'app/core';
import { Observable } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared';
import { DatosUsuarioService } from './datos-usuario.service';
import { PagosTiendaService } from '../pagos-tienda/pagos-tienda.service';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { RepresentanteTiendaService } from '../representante-tienda/representante-tienda.service';
import { PagosTorgaTiendasService } from '../pagos-torga-tiendas/pagos-torga-tiendas.service';
import { DireccionTiendasService } from '../direccion-tiendas/direccion-tiendas.service';
import { PasswordResetInitService } from '../../account/password-reset/init/password-reset-init.service';

@Component({
    selector: 'jhi-gestion-fabricantes',
    templateUrl: './gestion-tienda.component.html'
})
export class GestionTiendaComponent implements OnInit, OnDestroy {
    currentAccount: any;
    datosUsuarios: IDatosUsuario[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    torga: any;
    grupo: any;
    totalItems: any;
    isSaving: boolean;
    queryCount: any;
    tiendaInsert: any;
    tiendaAdmin: any;
    pagosTienda: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected datosUsuarioService: DatosUsuarioService,
        protected representanteTiendaService: RepresentanteTiendaService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        public direccionTiendasService: DireccionTiendasService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected pagosTiendaService: PagosTiendaService,
        protected dataUtils: JhiDataUtils,
        protected pagosTorgaTiendasService: PagosTorgaTiendasService,
        public passwordResetInitService: PasswordResetInitService,
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
    public enviarMensaje() {
        var textArea = $('#textAreacomentarios').val();
        this.passwordResetInitService.enviar1(textArea, this.datosUsuarios[0]['email']).subscribe();
    }
    loadAll() {
        var tiendaBuena = [];
        this.datosUsuarioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDatosUsuario[]>) => {
                    var idCuenta = this.currentAccount['id'];

                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['user'] != null) {
                            if (res.body[i]['user']['id'] == idCuenta) {
                                tiendaBuena[0] = res.body[i];
                            }
                        }
                    }
                    if (tiendaBuena[0] != undefined) {
                        this.direccionTiendasService.query1(tiendaBuena[0]['id']).subscribe(data => {
                            console.log(data.body);
                            this.direccionTiendasService.todos = data.body;
                        });
                    }
                    this.paginateDatosUsuarios(tiendaBuena, res.headers);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    public creardirecciontienda() {
        var direc = $('#direccioncreardireccion').val();
        console.log(this.datosUsuarios);
        const cod = $('#codPostalcreardireccion').val();
        var pob = $('#poblacioncreardireccion').val();
        var prov = $('#provinciacreardireccion').val();
        var fijo = $('#fijocreardireccion').val();
        var movil = $('#movilcreardireccion').val();
        var nombre = $('#nombrecreardireccion').val();
        if (
            direc != undefined &&
            cod != undefined &&
            pob != undefined &&
            prov != undefined &&
            fijo != undefined &&
            movil != undefined &&
            nombre != undefined
        ) {
            const meter = {
                nombre: nombre.toString(),
                direccion: direc.toString(),
                provincias: prov.toString(),
                municipios: pob.toString(),
                fijo: fijo.toString(),
                movil: movil.toString(),
                datosUsuario: this.datosUsuarios[0]
            };
            this.subscribeToSaveResponse(this.direccionTiendasService.create(meter));
            var todos = this.direccionTiendasService.todos;
            todos[todos.length] = meter;
        }
    }

    public pagosFuncion() {
        var tienda = this.tiendaInsert;
        var cont = 0;
        var pagos = [];
        this.pagosTiendaService
            .query({
                size: 10000000
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    for (let o = 0; o < res.body.length; o++) {
                        if (res.body[o]['datosUsuario']['user']['id'] == tienda['user']['id']) {
                            pagos[cont] = res.body[o];
                            cont++;
                        }
                    }
                    this.pagosTienda = pagos;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/datos-usuario'], {
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
            '/datos-usuario',
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
        this.registerChangeInDatosUsuarios();
    }

    public precioTienda() {
        var precioTienda = $('#precioTienda').val();
        $('#precioTiendaCalculado').val(precioTienda + '%');
    }

    public guardarPago() {
        var pagos = this.pagosTienda;
        var funcion;
        var funcion1 = 0;
        var length = pagos.length + 1;
        var comprobar = $('#pagoTienda' + length).val();
        if (comprobar != '' && comprobar != undefined) {
            funcion = 1;
        }
        if (pagos[0] == undefined) {
            funcion = 1;
        }

        if (funcion == 0) {
            for (let i = 1; i <= pagos.length; i++) {
                var pagoTienda = $('#pagoTienda' + i).val();
                var descuento = $('#descuentoTienda' + i).val();
                if (pagos[i - 1]['pago'] == pagoTienda && pagos[i - 1]['pago'] == descuento) {
                    funcion1 = 0;
                } else {
                    if (descuento == '' && pagoTienda == '') {
                        funcion1 = 0;
                    } else {
                        funcion1 = 1;
                    }
                }
            }
        }
        var precioTienda;
        var tienda;
        precioTienda = $('#precioTienda').val();
        precioTienda = parseFloat(precioTienda);
        var tienda = this.tiendaInsert;
        var idPago;
        var precioSubidaBD = 0;
        var pagoCompro;
        var descuentoCompro;
        if (precioTienda != 0) {
            $('#textoErrorPrecio').remove();
            $('#precioTienda').removeAttr('style');
            $('#precioTienda').attr('style');
            $('#precioTienda').css({ 'text-align': 'center' });
            $('#precioTienda').css({ height: '70px' });
            precioSubidaBD = precioTienda / 100;

            if (funcion1 == 1) {
                for (let i = length - 1; i <= 40; i++) {
                    var pagoTienda = $('#pagoTienda' + i).val();
                    var descuento = $('#descuentoTienda' + i).val();
                    pagoTienda = pagoTienda.toString();
                    descuento = descuento.toString();
                    if (pagoTienda != '' && descuento != '' && descuento != undefined) {
                        const pagosTienda = {
                            precioTienda: precioSubidaBD,
                            datosUsuario: tienda,
                            pago: pagoTienda,
                            descuento: descuento
                        };
                        this.subscribeToSaveResponse(this.pagosTiendaService.create(pagosTienda));
                        sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                        this.pagosFuncion();
                    } else {
                        if (i == 1) {
                            const pagosTienda = {
                                precioTienda: precioSubidaBD,
                                datosUsuario: tienda
                            };
                            this.subscribeToSaveResponse(this.pagosTiendaService.create(pagosTienda));
                            sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                            this.pagosFuncion();
                        }
                    }
                }
            } else {
                if (precioSubidaBD != pagos[0]['precioTienda']) {
                    funcion = 1;
                    if (funcion == 1) {
                        for (let m = 0; m < pagos.length; m++) {
                            pagos[m]['precioTienda'] = precioSubidaBD;
                            this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[m]));
                            if (m == 0) {
                                $('#cantidadPrecio').append('<p id="textoErrorPrecio" style="font-size:30px">Has modificado el dato</p>');
                                sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                            }
                        }
                        for (let i = 1; i <= pagos.length; i++) {
                            idPago = $('#pagoTienda' + i).attr('class');
                            pagoCompro = $('#pagoTienda' + i).val();
                            descuentoCompro = $('#descuentoTienda' + i).val();
                            for (let k = 0; k < pagos.length; k++) {
                                if (pagos[k]['id'] == idPago) {
                                    if (pagos[k]['pago'] != pagoCompro && pagos[k]['descuento'] != descuentoCompro) {
                                        pagos[k]['pago'] = pagoCompro;
                                        pagos[k]['descuento'] = descuentoCompro;
                                        pagos[k]['precioTienda'] = precioSubidaBD;
                                        $('#' + idPago).append('<p>Has modificado el dato</p>');
                                        this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                        sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                    } else {
                                        if (pagos[k]['pago'] != pagoCompro) {
                                            pagos[k]['pago'] = pagoCompro;
                                            pagos[k]['precioTienda'] = precioSubidaBD;
                                            $('#' + idPago).append('<p>Has modificado el dato</p>');
                                            this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                            sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                        } else {
                                            if (pagos[k]['descuento'] != descuentoCompro) {
                                                pagos[k]['descuento'] = descuentoCompro;
                                                pagos[k]['precioTienda'] = precioSubidaBD;
                                                $('#' + idPago).append('<p>Has modificado el dato</p>');
                                                this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                                sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                            } else {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (funcion == 0) {
                if (pagos[0]['precioTienda'] == precioSubidaBD) {
                    for (let i = 1; i <= pagos.length; i++) {
                        idPago = $('#pagoTienda' + i).attr('class');
                        pagoCompro = $('#pagoTienda' + i).val();
                        descuentoCompro = $('#descuentoTienda' + i).val();
                        for (let k = 0; k < pagos.length; k++) {
                            if (pagos[k]['id'] == idPago) {
                                if (pagos[k]['pago'] != pagoCompro && pagos[k]['descuento'] != descuentoCompro) {
                                    pagos[k]['pago'] = pagoCompro;
                                    pagos[k]['descuento'] = descuentoCompro;
                                    $('#' + idPago).append('<p>Has modificado el dato</p>');
                                    this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                } else {
                                    if (pagos[k]['pago'] != pagoCompro) {
                                        pagos[k]['pago'] = pagoCompro;
                                        $('#' + idPago).append('<p>Has modificado el dato</p>');
                                        this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                    } else {
                                        if (pagos[k]['descuento'] != descuentoCompro) {
                                            pagos[k]['descuento'] = descuentoCompro;
                                            $('#' + idPago).append('<p>Has modificado el dato</p>');
                                            this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                        } else {
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (let m = 0; m < pagos.length; m++) {
                        pagos[m]['precioTienda'] = precioSubidaBD;
                        this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[m]));
                        if (m == 0) {
                            $('#cantidadPrecio').append('<p id="textoErrorPrecio" style="font-size:30px">Has modificado el dato</p>');
                            sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                        }
                    }
                    for (let i = 1; i <= pagos.length; i++) {
                        idPago = $('#pagoTienda' + i).attr('class');
                        pagoCompro = $('#pagoTienda' + i).val();
                        descuentoCompro = $('#descuentoTienda' + i).val();
                        for (let k = 0; k < pagos.length; k++) {
                            if (pagos[k]['id'] == idPago) {
                                if (pagos[k]['pago'] != pagoCompro && pagos[k]['descuento'] != descuentoCompro) {
                                    pagos[k]['pago'] = pagoCompro;
                                    pagos[k]['descuento'] = descuentoCompro;
                                    pagos[k]['precioTienda'] = precioSubidaBD;
                                    $('#' + idPago).append('<p>Has modificado el dato</p>');
                                    this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                    sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                } else {
                                    if (pagos[k]['pago'] != pagoCompro) {
                                        pagos[k]['pago'] = pagoCompro;
                                        pagos[k]['precioTienda'] = precioSubidaBD;
                                        $('#' + idPago).append('<p>Has modificado el dato</p>');
                                        this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                        sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                    } else {
                                        if (pagos[k]['descuento'] != descuentoCompro) {
                                            pagos[k]['descuento'] = descuentoCompro;
                                            pagos[k]['precioTienda'] = precioSubidaBD;
                                            $('#' + idPago).append('<p>Has modificado el dato</p>');
                                            this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                            sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                        } else {
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (funcion == 1) {
                        for (let m = 0; m < pagos.length; m++) {
                            pagos[m]['precioTienda'] = precioSubidaBD;
                            this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[m]));
                            if (m == 0) {
                                $('#cantidadPrecio').append('<p id="textoErrorPrecio" style="font-size:30px">Has modificado el dato</p>');
                                sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                            }
                        }
                        for (let i = 1; i <= pagos.length; i++) {
                            idPago = $('#pagoTienda' + i).attr('class');
                            pagoCompro = $('#pagoTienda' + i).val();
                            descuentoCompro = $('#descuentoTienda' + i).val();
                            for (let k = 0; k < pagos.length; k++) {
                                if (pagos[k]['id'] == idPago) {
                                    if (pagos[k]['pago'] != pagoCompro && pagos[k]['descuento'] != descuentoCompro) {
                                        pagos[k]['pago'] = pagoCompro;
                                        pagos[k]['descuento'] = descuentoCompro;
                                        pagos[k]['precioTienda'] = precioSubidaBD;
                                        $('#' + idPago).append('<p>Has modificado el dato</p>');
                                        this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                        sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                    } else {
                                        if (pagos[k]['pago'] != pagoCompro) {
                                            pagos[k]['pago'] = pagoCompro;
                                            pagos[k]['precioTienda'] = precioSubidaBD;
                                            $('#' + idPago).append('<p>Has modificado el dato</p>');
                                            this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                            sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                        } else {
                                            if (pagos[k]['descuento'] != descuentoCompro) {
                                                pagos[k]['descuento'] = descuentoCompro;
                                                pagos[k]['precioTienda'] = precioSubidaBD;
                                                $('#' + idPago).append('<p>Has modificado el dato</p>');
                                                this.subscribeToSaveResponse(this.pagosTiendaService.update(pagos[k]));
                                                sessionStorage.setItem('precioTienda', JSON.stringify(precioSubidaBD));
                                            } else {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            $('#precioTienda').css({ border: '1px solid red' });
            $('#cantidadPrecio').append('<p id="textoErrorPrecio" style="color:red;font-size:30px">Introduce un campo valido</p>');
        }
    }

    public nuevoPago(id) {
        var pagoTienda = $('#pagoTienda' + id).val();
        var descuento = $('#descuentoTienda' + id).val();
        if (pagoTienda != '' && descuento != '') {
            $('#pagos').append('<br><br>');
            $('#pagos').append(
                '<div style="margin-left:0%" class="form-group row"><label for="pagoComercial" class="col-sm-1 col-form-label">PAGO</label><div class="col-sm-2"><input type="text" style="text-align:center;height:70px" class="form-control" id="pagoTienda' +
                    (id + 1) +
                    '" value="" onchange="nuevoPago(' +
                    (id + 1) +
                    ')"></div><label for="pagoComercial" class="col-sm-4 col-form-label">PUEDE CONLLEVAR UN DESCUENTO MÁXIMO DEL</label><div class="col-sm-2"><input type="text" style="text-align:center;height:70px" class="form-control" id="descuentoTienda' +
                    (id + 1) +
                    '" value="" onchange="nuevoPago(' +
                    (id + 1) +
                    ')"></div></div>'
            );
            var altura = $(document).height();
            $('html, body').animate({ scrollTop: altura + 'px' });
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDatosUsuario) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInDatosUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('datosUsuarioListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateDatosUsuarios(data: IDatosUsuario[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.datosUsuarios = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagosTienda>>) {
        result.subscribe((res: HttpResponse<IPagosTienda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
