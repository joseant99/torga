import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICoordenadas } from 'app/shared/model/coordenadas.model';

@Component({
    selector: 'jhi-coordenadas-detail',
    templateUrl: './coordenadas-detail.component.html'
})
export class CoordenadasDetailComponent implements OnInit {
    coordenadas: ICoordenadas;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coordenadas }) => {
            this.coordenadas = coordenadas;
        });
    }

    previousState() {
        window.history.back();
    }
}
