import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDatosCliente } from 'app/shared/model/datos-cliente.model';

@Component({
    selector: 'jhi-datos-cliente-detail',
    templateUrl: './datos-cliente-detail.component.html'
})
export class DatosClienteDetailComponent implements OnInit {
    datosCliente: IDatosCliente;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ datosCliente }) => {
            this.datosCliente = datosCliente;
        });
    }

    previousState() {
        window.history.back();
    }
}
