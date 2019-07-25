import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvincias } from 'app/shared/model/provincias.model';

@Component({
    selector: 'jhi-provincias-detail',
    templateUrl: './provincias-detail.component.html'
})
export class ProvinciasDetailComponent implements OnInit {
    provincias: IProvincias;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ provincias }) => {
            this.provincias = provincias;
        });
    }

    previousState() {
        window.history.back();
    }
}
