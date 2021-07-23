import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';

@Component({
    selector: 'jhi-interior-armario-medida-detail',
    templateUrl: './interior-armario-medida-detail.component.html'
})
export class InteriorArmarioMedidaDetailComponent implements OnInit {
    interiorArmarioMedida: IInteriorArmarioMedida;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interiorArmarioMedida }) => {
            this.interiorArmarioMedida = interiorArmarioMedida;
        });
    }

    previousState() {
        window.history.back();
    }
}
