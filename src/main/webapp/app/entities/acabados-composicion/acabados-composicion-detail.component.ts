import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcabadosComposicion } from 'app/shared/model/acabados-composicion.model';

@Component({
    selector: 'jhi-acabados-composicion-detail',
    templateUrl: './acabados-composicion-detail.component.html'
})
export class AcabadosComposicionDetailComponent implements OnInit {
    acabadosComposicion: IAcabadosComposicion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabadosComposicion }) => {
            this.acabadosComposicion = acabadosComposicion;
        });
    }

    previousState() {
        window.history.back();
    }
}
