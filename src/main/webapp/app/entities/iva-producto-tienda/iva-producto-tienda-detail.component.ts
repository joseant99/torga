import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';

@Component({
    selector: 'jhi-iva-producto-tienda-detail',
    templateUrl: './iva-producto-tienda-detail.component.html'
})
export class IvaProductoTiendaDetailComponent implements OnInit {
    ivaProductoTienda: IIvaProductoTienda;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ivaProductoTienda }) => {
            this.ivaProductoTienda = ivaProductoTienda;
        });
    }

    previousState() {
        window.history.back();
    }
}
