import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportistas } from 'app/shared/model/transportistas.model';

@Component({
    selector: 'jhi-transportistas-detail',
    templateUrl: './transportistas-detail.component.html'
})
export class TransportistasDetailComponent implements OnInit {
    transportistas: ITransportistas;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportistas }) => {
            this.transportistas = transportistas;
        });
    }

    previousState() {
        window.history.back();
    }
}
