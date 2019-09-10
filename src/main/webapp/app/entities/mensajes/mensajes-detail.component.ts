import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMensajes } from 'app/shared/model/mensajes.model';

@Component({
    selector: 'jhi-mensajes-detail',
    templateUrl: './mensajes-detail.component.html'
})
export class MensajesDetailComponent implements OnInit {
    mensajes: IMensajes;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mensajes }) => {
            this.mensajes = mensajes;
        });
    }

    previousState() {
        window.history.back();
    }
}
