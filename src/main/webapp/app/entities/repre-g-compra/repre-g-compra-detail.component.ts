import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepreGCompra } from 'app/shared/model/repre-g-compra.model';

@Component({
    selector: 'jhi-repre-g-compra-detail',
    templateUrl: './repre-g-compra-detail.component.html'
})
export class RepreGCompraDetailComponent implements OnInit {
    repreGCompra: IRepreGCompra;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ repreGCompra }) => {
            this.repreGCompra = repreGCompra;
        });
    }

    previousState() {
        window.history.back();
    }
}
