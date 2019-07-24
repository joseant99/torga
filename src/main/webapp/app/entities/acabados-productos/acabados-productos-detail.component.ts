import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcabados_Productos } from 'app/shared/model/acabados-productos.model';

@Component({
    selector: 'jhi-acabados-productos-detail',
    templateUrl: './acabados-productos-detail.component.html'
})
export class Acabados_ProductosDetailComponent implements OnInit {
    acabados_Productos: IAcabados_Productos;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabados_Productos }) => {
            this.acabados_Productos = acabados_Productos;
        });
    }

    previousState() {
        window.history.back();
    }
}
