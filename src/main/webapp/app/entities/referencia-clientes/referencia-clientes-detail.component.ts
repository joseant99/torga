import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';

@Component({
    selector: 'jhi-referencia-clientes-detail',
    templateUrl: './referencia-clientes-detail.component.html'
})
export class ReferenciaClientesDetailComponent implements OnInit {
    referenciaClientes: IReferenciaClientes;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ referenciaClientes }) => {
            this.referenciaClientes = referenciaClientes;
        });
    }

    previousState() {
        window.history.back();
    }
}
