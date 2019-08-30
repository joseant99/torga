import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVendedores } from 'app/shared/model/vendedores.model';

@Component({
    selector: 'jhi-vendedores-detail',
    templateUrl: './vendedores-detail.component.html'
})
export class VendedoresDetailComponent implements OnInit {
    vendedores: IVendedores;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vendedores }) => {
            this.vendedores = vendedores;
        });
    }

    previousState() {
        window.history.back();
    }
}
