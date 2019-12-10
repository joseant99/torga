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
import { ProvinciasService } from '../provincias/provincias.service';
import { MunicipiosService } from '../municipios/municipios.service';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { DatosClienteService } from '../datos-cliente/datos-cliente.service';
import { IDatosCliente } from 'app/shared/model/datos-cliente.model';
import { ContactoFabricaService } from '../contacto-fabrica/contacto-fabrica.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';

@Component({
    selector: 'jhi-presupuesto-productos',
    templateUrl: './presupuesto-productos.component.html'
})
export class PresupuestoProductosComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosPresupuestoPedidos: any;
    error: any;
    isSaving: boolean;
    success: any;
    presupuestoPedidos: IPresupuestoPedido[];
    eventSubscriber: Subscription;
    productos: any;
    provincias: any;
    municipios: any;
    acabados: any;
    iluminacion: any;
    routeData: any;
    presupuestos = [];
    precioTienda: any;
    links: any;
    totalItems: any;
    queryCount: any;
    account: any;
    itemsPerPage: any;
    idPresu: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected contactoFabricaService: ContactoFabricaService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected datosClienteService: DatosClienteService,
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
        var ventana = window.open('');
        ventana.document.write('<html><head><title>' + document.title + '</title>');
        ventana.document.write('</head><body >');
        ventana.document.write(divToPrint.innerHTML);
        ventana.document.write('</body></html>');
        ventana.document.close();
        ventana.focus();
        ventana.print();
        return true;
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
    public mostrarPrecioFabrica() {
        var productos = this.productos;
        for (let i = 0; i < productos.length; i++) {
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).removeAttr('style');
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).attr('style');
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).css({ float: 'right' });
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).css({ 'margin-right': '10%' });
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).removeAttr('style');
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).attr('style');
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).css({ float: 'right' });
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).css({ 'margin-right': '20%' });
        }
    }

    public pedido() {
        var actualizar;
        var todosPresupuestos = this.productosPresupuestoPedidosService.todos;
        var actualizar = todosPresupuestos[0];
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
    protected subscribeToSaveResponse3(result: Observable<HttpResponse<IDatosCliente>>) {
        result.subscribe((res: HttpResponse<IDatosCliente>) => this.onSaveSuccess3(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected onSaveSuccess3() {
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
        var acabados1 = [];
        var precioTienda = this.precioTienda;
        var cont = 0;
        var presu;
        presu = sessionStorage.getItem('presupuesto');

        this.acabadosProductosPresupuestoPedidoService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    acabados1[i] = data['body'][i];
                }
            });
        this.acabados = acabados1;
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
        var acabados = [];
        var iluminacion = this.iluminacion;
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
                    this.acabadosProductosPresupuestoPedidoService
                        .query({
                            size: 1000000
                        })
                        .subscribe((res: HttpResponse<IAcabadosProductosPresupuestoPedido[]>) => {
                            for (let i = 0; i < res.body.length; i++) {
                                acabados[i] = res.body[i];
                            }
                            var apoyo;
                            setTimeout(function() {
                                if (productos != undefined) {
                                    for (let i = 0; i < productos.length; i++) {
                                        var contador = 1;
                                        apoyo = undefined;
                                        for (let k = 0; k < acabados.length; k++) {
                                            if (productos[i]['id'] == acabados[k]['productosPresupuestoPedidos']['id']) {
                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                    '<p>Acabado ' +
                                                        contador +
                                                        '&nbsp;&nbsp;&nbsp; ' +
                                                        acabados[k]['acabados']['nombre'] +
                                                        '</p>'
                                                );
                                                var prodNombre =
                                                    acabados[k]['productosPresupuestoPedidos']['productosDormitorio']['nombre'];
                                                if (prodNombre == 'Modulo Bajo 1') {
                                                    prodNombre = 'mb1';
                                                }

                                                if (prodNombre == 'Modulo Bajo 4 Apertura Izquierda') {
                                                    prodNombre = 'mb6';
                                                }

                                                if (prodNombre == 'Aparador 2') {
                                                    prodNombre = 'ap2';
                                                }

                                                if (prodNombre == 'Aparador 3') {
                                                    prodNombre = 'ap3';
                                                }
                                                var nombreAcabado = acabados[k]['acabados']['nombre'].toLowerCase();
                                                if (nombreAcabado == 'marmol blanco') {
                                                    nombreAcabado = 'marmolblanco';
                                                }
                                                if (nombreAcabado == 'marmol negro') {
                                                    nombreAcabado = 'marmolnegro';
                                                }
                                                $('#imagen' + i).append(
                                                    '<img id="tapa" class="' +
                                                        nombreAcabado +
                                                        '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                        prodNombre +
                                                        '/' +
                                                        contador +
                                                        '/' +
                                                        prodNombre +
                                                        '_' +
                                                        contador +
                                                        '_' +
                                                        nombreAcabado +
                                                        '_optimized.png">'
                                                );

                                                if (
                                                    contador == 1 &&
                                                    acabados[k]['productosPresupuestoPedidos']['tiposApoyo'] != undefined
                                                ) {
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
                                            var total;
                                            total = precioFloat * precioTienda;
                                            console.log(total);
                                            total = total - precioFloat;
                                            $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioFloat * precioTienda);
                                            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).text(precioFloat);
                                            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).text(total);
                                        }

                                        for (let j = 0; j < iluminacion.length; j++) {
                                            if (iluminacion[j]['productosPresupuestoPedidos']['id'] == productos[i]['id']) {
                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                    '<p>Iluminacion&nbsp;&nbsp;&nbsp;' +
                                                        iluminacion[j]['iluminacion']['precio'] +
                                                        '&euro;</p>'
                                                );
                                                var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                                var fabrica;
                                                fabrica = $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).text();
                                                var ganancias;
                                                ganancias = $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).text();
                                                var precioFloat = 0;
                                                precioFloat = parseFloat(precioTotal);
                                                fabrica = parseFloat(fabrica);
                                                ganancias = parseFloat(fabrica);
                                                precioFloat = precioFloat + iluminacion[j]['iluminacion']['precio'];
                                                fabrica = fabrica + iluminacion[j]['iluminacion']['precio'] / 2;
                                                ganancias = ganancias + iluminacion[j]['iluminacion']['precio'] / 2;
                                                var subTotal = parseFloat($('#precioSubtotal').text());
                                                if (subTotal == 0) {
                                                    subTotal = precioFloat;
                                                }

                                                $('#precioSubtotal').text(precioFloat);
                                                var iva = precioFloat * 0.21;
                                                $('#ivaPrecioQuitar').remove();
                                                $('#ivaQuitar').append(
                                                    '<p id="ivaPrecioQuitar" style="font-size:25px">' + iva.toFixed(2) + '</p>'
                                                );
                                                iva = precioFloat + iva;
                                                $('#precioIvaSumado').remove();
                                                $('#precioCalculadoIva').append(
                                                    '<p id="precioIvaSumado" style="font-size:25px">' + iva.toFixed(2) + '</p>'
                                                );
                                                $('#totalDescuentoTexto').text(precioFloat);
                                                $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioFloat);
                                                $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).text(fabrica);
                                                $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).text(ganancias);
                                            }
                                        }
                                    }
                                }
                            }, 0);
                        });
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.datosClienteService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDatosCliente[]>) => {
                    for (let m = 0; m < res.body.length; m++) {
                        if (res.body[m]['presupuestoPedido']['id'] == presu) {
                            $('#nombre').val(res.body[m]['nombre']);
                            $('#correo').val(res.body[m]['correo']);
                            $('#telefono').val(res.body[m]['telefono']);
                            $('#provincia').val(res.body[m]['provincias']['nombre']);
                            $('#municipios').val(res.body[m]['municipios']['nombre']);
                            $('#direccion').val(res.body[m]['direccion']);
                            $('#codPostal').val(res.body[m]['codigoPostal']);
                            $('#enviar').val(res.body[m]['fines']);
                            $('#mandar').val(res.body[m]['enviar']);
                            $('#nombre').css({ 'background-color': '#D7D9DA' });
                            $('#correo').css({ 'background-color': '#D7D9DA' });
                            $('#telefono').css({ 'background-color': '#D7D9DA' });
                            $('#provincia').css({ 'background-color': '#D7D9DA' });
                            $('#municipios').css({ 'background-color': '#D7D9DA' });
                            $('#direccion').css({ 'background-color': '#D7D9DA' });
                            $('#codPostal').css({ 'background-color': '#D7D9DA' });
                            $('#enviar').css({ 'background-color': '#D7D9DA' });
                            $('#mandar').css({ 'background-color': '#D7D9DA' });
                        }
                    }
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
        this.router.navigate(['/productos-presupuesto-pedidos'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    public contactoPresupuesto() {
        var pedido = this.productos[0]['presupuestoPedido'];
        var usuario = this.currentAccount;
        $('#modal #relacion').val('Presupuestos');
        if (usuario['id'] == pedido['user']['id'] && pedido['pedido'] == 0) {
            $('#relacionCodigo').val(pedido['id']);
        }
    }
    public crearChat() {
        var pedido;
        pedido = this.productos[0]['presupuestoPedido'];
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output;
        output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        var numero;
        numero = 1;
        const contacto = {
            fechaInicio: output,
            tipo: numero,
            codigo: pedido['id'],
            user: this.currentAccount,
            presupuestoPedido: pedido
        };

        this.subscribeToSaveResponse2(this.contactoFabricaService.create(contacto));
    }

    public modificarDatos() {
        var id;
        var nombre;
        var correo;
        var telefono;
        var provinciaCoger;
        var municipioCoger;
        var provinciaBuena;
        var municipioBueno;
        var direccion;
        var provincias = this.provincias;
        var municipios = this.municipios;
        var todosPresupuestos = this.productosPresupuestoPedidos;
        var codPostal;
        var pres;
        var enviar;
        var mandar;
        id = $('#nombre').attr('class');
        if (id == 'id') {
            nombre = $('#nombre').val();
            correo = $('#correo').val();
            telefono = $('#telefono').val();
            provinciaCoger = $('#provincia').val();
            municipioCoger = $('#municipios').val();
            direccion = $('#direccion').val();
            codPostal = $('#codPostal').val();
            enviar = $('#enviar').val();
            mandar = $('#mandar').val();
            for (let i = 0; i < provincias.length; i++) {
                if (provincias[i]['id'] == provinciaCoger) {
                    provinciaBuena = provincias[i];
                }
            }

            for (let k = 0; k < municipios.length; k++) {
                if (municipios[k]['id'] == municipioCoger) {
                    municipioBueno = municipios[k];
                }
            }

            for (let i = 0; i < todosPresupuestos.length; i++) {
                if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                    if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                        pres = todosPresupuestos[i]['presupuestoPedido'];
                    }
                }
            }
            const datos = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                direccion: direccion,
                codigoPostal: codPostal,
                fines: enviar,
                enviar: mandar,
                provincias: provinciaBuena,
                municipios: municipioBueno,
                presupuestoPedido: pres
            };
            this.subscribeToSaveResponse3(this.datosClienteService.create(datos));
            $('#nombre').css({ 'background-color': '#D7D9DA' });
            $('#correo').css({ 'background-color': '#D7D9DA' });
            $('#telefono').css({ 'background-color': '#D7D9DA' });
            $('#provincia').css({ 'background-color': '#D7D9DA' });
            $('#municipios').css({ 'background-color': '#D7D9DA' });
            $('#direccion').css({ 'background-color': '#D7D9DA' });
            $('#codPostal').css({ 'background-color': '#D7D9DA' });
            $('#enviar').css({ 'background-color': '#D7D9DA' });
            $('#mandar').css({ 'background-color': '#D7D9DA' });
        } else {
            nombre = $('#nombre').val();
            correo = $('#correo').val();
            telefono = $('#telefono').val();
            provincias = $('#provincia').val();
            municipios = $('#municipio').val();
            direccion = $('#direccion').val();
            codPostal = $('#codPostal').val();
            enviar = $('#enviar').val();
            mandar = $('#mandar').val();
        }
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
        this.precioTienda = sessionStorage.getItem('precioTienda');
        $('body').removeAttr('class');
        var presupuestos = [];
        var saber = 0;
        var acabados = [];
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosPresupuestoPedidos();
        var idPresu = sessionStorage.getItem('presupuesto');
        this.idPresu = idPresu;
        this.contactoFabricaService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i] != undefined) {
                            if (res.body[i]['user']['id'] == this.currentAccount['id']) {
                                if (res.body[i]['presupuestoPedido'] != null) {
                                    if (res.body[i]['presupuestoPedido']['id'] == parseFloat(idPresu)) {
                                        saber = 1;
                                    }
                                }
                            }
                        }
                    }
                    if (saber == 1) {
                        $('#contacto1').remove();
                    } else {
                        $('#contacto2').remove();
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        var municipios = [];
        var provincias = [];
        this.accountService.identity().then(account => {
            this.account = account;
        });

        this.municipiosService.query1({}).subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                municipios[i] = data['body'][i];
            }
        });
        this.municipios = municipios;

        this.provinciasService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    provincias[i] = data['body'][i];
                }
            });
        this.provincias = provincias;

        this.productosPresupuestoPedidosService.query1(idPresu).subscribe(data => {
            this.productosPresupuestoPedidosService.todos = data.body;
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

    public cargarMunicipios() {
        var idProv = $('#provincia').val();
        $('#municipios').empty();
        $('#municipios').append('<option></option>');
        this.municipiosService.query1({}).subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                if (data['body'][i]['provincias']['id'] == idProv) {
                    $('#municipios').append('<option value="' + data['body'][i]['id'] + '">' + data['body'][i]['nombre'] + '</option>');
                }
            }
        });
    }

    public provinciasCargar() {
        this.provinciasService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    $('#provincia').append('<option value="' + data['body'][i]['id'] + '">' + data['body'][i]['nombre'] + '</option>');
                }
            });
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

    protected subscribeToSaveResponse2(result: Observable<HttpResponse<IContactoFabrica>>) {
        result.subscribe((res: HttpResponse<IContactoFabrica>) => this.onSaveSuccess2(), (res: HttpErrorResponse) => this.onSaveError2());
    }

    public onSaveSuccess2() {
        this.isSaving = false;
        var ultimo;
        this.contactoFabricaService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    ultimo = res.body.length;
                    ultimo = ultimo - 1;
                    this.router.navigate(['/contacto-fabrica', res.body[ultimo]['id'], 'chat']);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    protected onSaveError2() {
        this.isSaving = false;
    }
}
