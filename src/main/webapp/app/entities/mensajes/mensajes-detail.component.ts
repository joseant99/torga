import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMensajes } from 'app/shared/model/mensajes.model';

@Component({
    selector: 'jhi-mensajes-detail',
    templateUrl: './mensajes-detail.component.html'
})
export class MensajesDetailComponent implements OnInit {
    mensajes: IMensajes;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mensajes }) => {
            this.mensajes = mensajes;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
