import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
    constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'torgaPedidosApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }
    public puestas8Fun(puerta2, puerta3, puerta4, puerta5, puerta6, puerta7, puerta8, puerta9, i) {
        if (screen.width < 800) {
            if (puerta2 != undefined) {
                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta3 != undefined) {
                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:260px !important;margin-left: 0px !important;margin-top: 0px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta4 != undefined) {
                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta5 != undefined) {
                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 77px !important;margin-top: -16px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta6 != undefined) {
                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta7 != undefined) {
                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 154px !important;margin-top: -32px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta8 != undefined) {
                if (puerta8['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta8['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta8['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta8['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta8['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta8['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta8['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta8['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta8['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta8['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta9 != undefined) {
                if (puerta9['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta9['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta9['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta9['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta9['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta9['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta9['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta9['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta9['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta9['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 260px !important;margin-left: 232px !important;margin-top: -48px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }
        }
    }
    public puertas7Asi(puerta1, puerta2, puerta3, puerta4, puerta5, puerta6, puerta7, i) {
        if (screen.width < 800) {
            if (puerta3 != undefined) {
                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -8px !important;margin-left: 68px !important;width: 270px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta2 != undefined) {
                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta1 != undefined) {
                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta5 != undefined) {
                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta4 != undefined) {
                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 126px;margin-top: -26px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta7 != undefined) {
                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta6 != undefined) {
                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 210px;margin-top: -43px;width: 280px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }
        }
    }

    public puertas5der(puerta1, puerta2, puerta3, puerta4, puerta5, i) {
        if (screen.width < 800) {
            if (puerta5 != undefined) {
                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -28px;margin-left: 172px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -28px;margin-left: 172px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-top: -28px;margin-left: 172px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -28px;margin-left: 172px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -28px;margin-left: 172px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -28px;margin-left: 172px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -28px;margin-left: 172px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-top: -28px;margin-left: 172px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta2 != undefined) {
                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta1 != undefined) {
                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;width:315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta3 != undefined) {
                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta4 != undefined) {
                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-top: -30px;margin-left: 145px;margin-top: -20px;margin-left: 95px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }
        }
    }

    public puertas6sim(puerta2, puerta3, puerta4, puerta5, puerta6, puerta7, i) {
        if (screen.width < 800) {
            if (puerta2 != undefined) {
                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }

                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
            }

            if (puerta3 != undefined) {
                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }

                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
            }

            if (puerta4 != undefined) {
                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta5 != undefined) {
                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 90px;margin-top: -19px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta6 != undefined) {
                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta7 != undefined) {
                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 180px;margin-top: -38px;" src="' +
                            src +
                            '">'
                    );
                }
            }
        }
    }

    public armario7izq(puerta1, puerta2, puerta3, puerta4, puerta5, puerta6, puerta7, i) {
        if (screen.width < 800) {
            if (puerta1 != undefined) {
                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;width:285px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;width:285px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;width:285px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;width:285px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;width:285px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;width:285px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;width:285px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;width:285px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta2 != undefined) {
                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta3 != undefined) {
                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 60px;margin-top: -21px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta4 != undefined) {
                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta5 != undefined) {
                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 150px;margin-top: -39px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta6 != undefined) {
                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta7 != undefined) {
                if (puerta7['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta7['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta7['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 388px;margin-top: -93px;margin-left: 239px;margin-top: -57px;" src="' +
                            src +
                            '">'
                    );
                }
            }
        }
    }

    public armario6asi(puerta1, puerta2, puerta3, puerta4, puerta5, puerta6, i) {
        if (screen.width < 800) {
            if (puerta1 != undefined) {
                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
            }
            if (puerta6 != undefined) {
                if (puerta6['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta6['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta6['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;margin-left: 362px;margin-top:-76px;margin-left: 235px;margin-top: -49px;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta2 != undefined) {
                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta3 != undefined) {
                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 63px;margin-top: -22px;width: 315px!important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta4 != undefined) {
                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta5 != undefined) {
                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 157px;margin-top: -41px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }
        }
    }

    public puertas4izq(puerta1, puerta2, puerta3, puerta4, puerta5, i) {
        if (screen.width < 800) {
            if (puerta1 != undefined) {
                if (puerta1['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;opacity:0.4" src="' + src + '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src1 + '">'
                    );
                }

                if (puerta1['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
                if (puerta1['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/1 PUERTA/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:465px;position:absolute;z-index:5;" src="' + src + '">'
                    );
                }
            }

            if (puerta2 != undefined) {
                if (puerta2['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta2['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta2['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta3 != undefined) {
                if (puerta3['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta3['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta3['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 98px;margin-top: -33px;margin-left: 64px;margin-top: -22px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta4 != undefined) {
                if (puerta4['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/1.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/2.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/0.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta4['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/6.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/8.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/10.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/12.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta4['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }

            if (puerta5 != undefined) {
                if (puerta5['nombre'] == 'Puerta Aluminio Transparente') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/4.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Aluminio Gris') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/5.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;opacity:0.4;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                    var src1 = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/3.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src1 +
                            '">'
                    );
                }

                if (puerta5['nombre'] == 'Puerta Batiente sin tirador') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/7.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador TIM') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/9.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador NYE') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/11.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == 'Puerta Batiente tirador DRAW') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/13.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/14.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle TIM Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/15.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }

                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Izquierda') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/16.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 243px;margin-top: -63px;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
                if (puerta5['nombre'] == '2 Puertas Fuelle NYE Derecha') {
                    var src = '../../../content/images/1- PARA WEB/DORMITORIO/1- ARMARIOS/BATIENTES/2 PUERTAS/PUERTAS/17.png';
                    $('#cuerpo' + i + ' #derecha').append(
                        '<img class="armarioCalculadora" style="width:485px;position:absolute;z-index:5;margin-left: 158px;margin-top: -41px;width: 315px !important;margin-left: 158px;margin-top: -42px;width: 315px !important;" src="' +
                            src +
                            '">'
                    );
                }
            }
        }
    }
}
