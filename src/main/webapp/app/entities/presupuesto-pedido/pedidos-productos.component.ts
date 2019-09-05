import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { IluminacionProdPrePedService } from '../iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { PagosTiendaService } from '../pagos-tienda/pagos-tienda.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { MedEspProductoPedidoPresuService } from '../med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';

@Component({
    selector: 'jhi-pedidos-productos',
    templateUrl: './pedidos-productos.component.html'
})
export class PedidosProductosComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosPresupuestoPedidos: any;
    error: any;
    isSaving: boolean;
    success: any;
    presupuestoPedidos: IPresupuestoPedido[];
    eventSubscriber: Subscription;
    productos: any;
    acabados: any;
    iluminacion: any;
    routeData: any;
    presupuestos = [];
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected pagosTiendaService: PagosTiendaService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected accountService: AccountService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
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

    public imprimir() {
        var divToPrint = document.getElementById('imprimir');
        var newWin = window.open('');
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }

    public eliminar() {
        var id = parseFloat(sessionStorage.getItem('presupuesto'));
        this.presupuestoPedidoService.delete(id).subscribe();
        var actualizar;
        var todosPresupuestos = this.presupuestos;
        for (let i = 0; i < todosPresupuestos.length; i++) {
            if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                    actualizar = todosPresupuestos[i];
                    this.productosPresupuestoPedidosService.delete(actualizar['id']).subscribe();
                }
            }
        }
    }

    public pedido() {
        console.log(this.presupuestos);
        var actualizar;
        var todosPresupuestos = this.presupuestos;
        for (let i = 0; i < todosPresupuestos.length; i++) {
            if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                    actualizar = todosPresupuestos[i];
                }
            }
        }
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

        actualizar['presupuestoPedido']['pedido'] = 1;
        actualizar['presupuestoPedido']['fecha_pedido'] = output;
        var presupuestoActualizado = actualizar['presupuestoPedido'];
        console.log(actualizar);
        console.log(presupuestoActualizado);

        this.subscribeToSaveResponse(this.presupuestoPedidoService.update(presupuestoActualizado));
        this.subscribeToSaveResponse1(this.productosPresupuestoPedidosService.update(actualizar));
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected subscribeToSaveResponse1(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    ngAfterViewInit() {}
    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }
    previousState() {
        window.history.back();
    }
    protected onSaveError() {
        this.isSaving = false;
    }
    loadAll() {
        var medidasEspeciales = [];
        this.medEspProductoPedidoPresuService
            .query({
                size: 10000000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    medidasEspeciales[i] = data['body'][i];
                }
            });

        var productosPresupuesto = [];
        var acabados = [];
        var cont = 0;
        var presu = sessionStorage.getItem('presupuesto');
        this.productosPresupuestoPedidosService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['presupuestoPedido'] != null) {
                            if (parseFloat(presu) == res.body[i]['presupuestoPedido']['id']) {
                                if (res.body[i]['dimensionesProductoTipo']['mensaje'] == 'Medidas Especiales') {
                                    for (let k = 0; k < medidasEspeciales.length; k++) {
                                        if (medidasEspeciales[k]['productosPresupuestoPedidos']['id'] == res.body[i]['id']) {
                                            res.body[i]['dimensionesProductoTipo']['ancho'] = medidasEspeciales[k]['ancho'];
                                            res.body[i]['dimensionesProductoTipo']['alto'] = medidasEspeciales[k]['alto'];
                                            res.body[i]['dimensionesProductoTipo']['fondo'] = medidasEspeciales[k]['fondo'];
                                            res.body[i]['dimensionesProductoTipo']['precio'] = medidasEspeciales[k]['precio'];
                                            var precioEspecial = parseFloat(medidasEspeciales[k]['precio']);
                                            var menosPrecio = precioEspecial * 0.3;
                                            menosPrecio = precioEspecial - menosPrecio;
                                            var incremento = menosPrecio * 0.3;
                                            res.body[i]['dimensionesProductoTipo']['incremento'] = incremento.toFixed(2);
                                            productosPresupuesto[cont] = res.body[i];
                                            cont++;
                                        }
                                    }
                                } else {
                                    productosPresupuesto[cont] = res.body[i];
                                    cont++;
                                }
                            }
                        }
                    }
                    this.paginateProductosPresupuestoPedidos(productosPresupuesto, res.headers);
                    this.productos = productosPresupuesto;

                    var productos = this.productos;
                    var acabados = this.acabados;
                    var iluminacion = this.iluminacion;
                    var apoyo;
                    setTimeout(function() {
                        if (productos != undefined && acabados != []) {
                            for (let i = 0; i < productos.length; i++) {
                                var contador = 1;
                                apoyo = undefined;
                                for (let k = 0; k < acabados.length; k++) {
                                    if (productos[i]['id'] == acabados[k]['productosPresupuestoPedidos']['id']) {
                                        $('.' + productos[i]['id'] + 'Datos').append(
                                            '<p>Acabado ' + contador + '&nbsp;&nbsp;&nbsp; ' + acabados[k]['acabados']['nombre'] + '</p>'
                                        );
                                        if (i == 0) {
                                            $('#imagen' + i).append(
                                                '<img id="tapa" style="position: absolute;left: 65px;margin-top: -70px;" src="../../../content/images/TAPA-Nature.png">'
                                            );
                                            $('#imagen' + i).append(
                                                '<img id="cajon" style="position: absolute;left: 65px;margin-top: -70px;" src="../../../content/images/CAJON.png">'
                                            );
                                            $('#imagen' + i).append(
                                                '<img id="cajon" style="position: absolute;left: 65px;margin-top: -70px;" src="../../../content/images/CASCO.png">'
                                            );
                                        }

                                        if (contador == 1 && acabados[k]['productosPresupuestoPedidos']['tiposApoyo'] != undefined) {
                                            apoyo = acabados[k];
                                        }

                                        contador++;
                                    }
                                }
                                if (apoyo != undefined) {
                                    $('.' + productos[i]['id'] + 'Datos').append(
                                        '<p>' +
                                            apoyo['productosPresupuestoPedidos']['tiposApoyo']['productoApoyo']['nombre'] +
                                            '&nbsp;&nbsp;&nbsp; ' +
                                            apoyo['productosPresupuestoPedidos']['tiposApoyo']['precio'] +
                                            '&euro;</p>'
                                    );
                                    var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                    if (precioTotal != '') {
                                        var precioFloat = parseFloat(precioTotal);
                                    }
                                    precioFloat = precioFloat + apoyo['productosPresupuestoPedidos']['tiposApoyo']['precio'];
                                    var subTotal = parseFloat($('#precioSubtotal').text());
                                    subTotal = subTotal + precioFloat;
                                    $('#precioSubtotal').text(subTotal);
                                    $('#totalDescuentoTexto').text(subTotal);
                                    var iva = subTotal * 0.21;
                                    $('#ivaPrecioQuitar').remove();
                                    $('#ivaQuitar').append('<p id="ivaPrecioQuitar">' + iva.toFixed(2) + '</p>');
                                    iva = subTotal + iva;
                                    $('#precioIvaSumado').remove();
                                    $('#precioCalculadoIva').append(
                                        '<p id="precioIvaSumado" style="font-size:25px">' + iva.toFixed(2) + '</p>'
                                    );
                                    $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioFloat);
                                }

                                for (let j = 0; j < iluminacion.length; j++) {
                                    if (iluminacion[j]['productosPresupuestoPedidos']['id'] == productos[i]['id']) {
                                        $('.' + productos[i]['id'] + 'Datos').append(
                                            '<p>Iluminacion&nbsp;&nbsp;&nbsp;' + iluminacion[j]['iluminacion']['precio'] + '&euro;</p>'
                                        );
                                        var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                        var precioFloat = parseFloat(precioTotal);
                                        precioFloat = precioFloat + iluminacion[j]['iluminacion']['precio'];
                                        var subTotal = parseFloat($('#precioSubtotal').text());
                                        if (subTotal == 0) {
                                            subTotal = precioFloat;
                                        }

                                        $('#precioSubtotal').text(precioFloat);
                                        var iva = precioFloat * 0.21;
                                        $('#ivaPrecioQuitar').remove();
                                        $('#ivaQuitar').append('<p id="ivaPrecioQuitar" style="font-size:25px">' + iva.toFixed(2) + '</p>');
                                        iva = precioFloat + iva;
                                        $('#precioIvaSumado').remove();
                                        $('#precioCalculadoIva').append(
                                            '<p id="precioIvaSumado" style="font-size:25px">' + iva.toFixed(2) + '</p>'
                                        );
                                        $('#totalDescuentoTexto').text(precioFloat);
                                        $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioFloat);
                                    }
                                }
                            }
                        }
                    }, 100);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.acabadosProductosPresupuestoPedidoService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    acabados[index] = value;
                });
            });
        this.acabados = acabados;
        var ilu = [];

        this.iluminacionProdPrePedService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    ilu[i] = data['body'][i];
                }
            });
        this.iluminacion = ilu;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/productos-presupuesto-pedidos'], {
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
            '/productos-presupuesto-pedidos',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        var presupuestos = [];
        var acabados = [];
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosPresupuestoPedidos();

        this.productosPresupuestoPedidosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    presupuestos[index] = value;
                });
            });

        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.pagosTiendaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    $('#pago').html('<form><select style="width:150px;height:50px" class="tipoPago"><option></option></select></form>');
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['datosUsuario']['id'] == tienda['id']) {
                            $('.tipoPago').append('<option value="' + res.body[i]['id'] + '">' + res.body[i]['pago'] + '</option>');
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    public descuento() {
        var valor;
        var maximo = parseFloat($('#descuentoPago').attr('max'));
        var precioNormal = parseFloat($('#precioSubtotal').text());
        valor = $('#descuentoPago').val();
        valor = parseFloat(valor);
        if (valor <= maximo) {
            $('#descuentoPago').css({ border: '0' });
            var precioDescuento = precioNormal * (valor / 100);
            $('#precioConDescuento').remove();
            $('#descuentoCalculado').append(
                '<p id="precioConDescuento" style="font-size:25px">-' + precioDescuento.toFixed(2) + '&euro;</p>'
            );
            precioDescuento = precioNormal - precioDescuento;
            $('#totalDescuentoTexto').text(precioDescuento.toFixed(2));
            var iva = precioDescuento * 0.21;
            $('#ivaPrecioQuitar').remove();
            $('#ivaQuitar').append('<p id="ivaPrecioQuitar" style="font-size:25px">' + iva.toFixed(2) + '</p>');
            iva = precioDescuento + iva;
            $('#precioIvaSumado').remove();
            $('#precioCalculadoIva').append('<p id="precioIvaSumado" style="font-size:25px">' + iva.toFixed(2) + '</p>');
        } else {
            $('#descuentoPago').css({ border: 'red 1px solid' });
        }
    }

    public pago() {
        var id = $('.tipoPago').val();

        this.pagosTiendaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['id'] == id) {
                            var arr = res.body[i]['descuento'].split('%');
                            console.log(arr);
                            $('#descuentoPago').attr('max', arr[0]);
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductosPresupuestoPedidos) {
        return item.id;
    }

    registerChangeInProductosPresupuestoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('productosPresupuestoPedidosListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateProductosPresupuestoPedidos(data: IProductosPresupuestoPedidos[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosPresupuestoPedidos = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
