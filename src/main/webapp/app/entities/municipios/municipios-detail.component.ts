import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMunicipios } from 'app/shared/model/municipios.model';

@Component({
    selector: 'jhi-municipios-detail',
    templateUrl: './municipios-detail.component.html'
})
export class MunicipiosDetailComponent implements OnInit {
    municipios: IMunicipios;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ municipios }) => {
            this.municipios = municipios;
        });
    }

    previousState() {
        window.history.back();
    }
}
