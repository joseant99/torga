import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZonas } from 'app/shared/model/zonas.model';

@Component({
    selector: 'jhi-zonas-detail',
    templateUrl: './zonas-detail.component.html'
})
export class ZonasDetailComponent implements OnInit {
    zonas: IZonas;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zonas }) => {
            this.zonas = zonas;
        });
    }

    previousState() {
        window.history.back();
    }
}
