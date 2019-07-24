import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcabadosProducto } from 'app/shared/model/acabados-producto.model';

@Component({
    selector: 'jhi-acabados-producto-detail',
    templateUrl: './acabados-producto-detail.component.html'
})
export class AcabadosProductoDetailComponent implements OnInit {
    acabadosProducto: IAcabadosProducto;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabadosProducto }) => {
            this.acabadosProducto = acabadosProducto;
        });
    }

    previousState() {
        window.history.back();
    }
}
