import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAcabados } from 'app/shared/model/acabados.model';

@Component({
    selector: 'jhi-acabados-detail',
    templateUrl: './acabados-detail.component.html'
})
export class AcabadosDetailComponent implements OnInit {
    acabados: IAcabados;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabados }) => {
            this.acabados = acabados;
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
