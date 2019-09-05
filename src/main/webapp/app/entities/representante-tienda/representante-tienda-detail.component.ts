import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';

@Component({
    selector: 'jhi-representante-tienda-detail',
    templateUrl: './representante-tienda-detail.component.html'
})
export class RepresentanteTiendaDetailComponent implements OnInit {
    representanteTienda: IRepresentanteTienda;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ representanteTienda }) => {
            this.representanteTienda = representanteTienda;
        });
    }

    previousState() {
        window.history.back();
    }
}
