import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportistaTabla } from 'app/shared/model/transportista-tabla.model';

@Component({
    selector: 'jhi-transportista-tabla-detail',
    templateUrl: './transportista-tabla-detail.component.html'
})
export class TransportistaTablaDetailComponent implements OnInit {
    transportistaTabla: ITransportistaTabla;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportistaTabla }) => {
            this.transportistaTabla = transportistaTabla;
        });
    }

    previousState() {
        window.history.back();
    }
}
