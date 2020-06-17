import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INiveladores } from 'app/shared/model/niveladores.model';

@Component({
    selector: 'jhi-niveladores-detail',
    templateUrl: './niveladores-detail.component.html'
})
export class NiveladoresDetailComponent implements OnInit {
    niveladores: INiveladores;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ niveladores }) => {
            this.niveladores = niveladores;
        });
    }

    previousState() {
        window.history.back();
    }
}
