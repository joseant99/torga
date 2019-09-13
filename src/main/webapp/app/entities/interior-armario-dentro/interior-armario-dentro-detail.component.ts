import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IInteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';

@Component({
    selector: 'jhi-interior-armario-dentro-detail',
    templateUrl: './interior-armario-dentro-detail.component.html'
})
export class InteriorArmarioDentroDetailComponent implements OnInit {
    interiorArmarioDentro: IInteriorArmarioDentro;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interiorArmarioDentro }) => {
            this.interiorArmarioDentro = interiorArmarioDentro;
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
