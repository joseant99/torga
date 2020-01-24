import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDireccionTiendas } from 'app/shared/model/direccion-tiendas.model';

@Component({
    selector: 'jhi-direccion-tiendas-detail',
    templateUrl: './direccion-tiendas-detail.component.html'
})
export class DireccionTiendasDetailComponent implements OnInit {
    direccionTiendas: IDireccionTiendas;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ direccionTiendas }) => {
            this.direccionTiendas = direccionTiendas;
        });
    }

    previousState() {
        window.history.back();
    }
}
