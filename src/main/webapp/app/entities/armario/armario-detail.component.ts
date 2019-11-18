import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IArmario } from 'app/shared/model/armario.model';

@Component({
    selector: 'jhi-armario-detail',
    templateUrl: './armario-detail.component.html'
})
export class ArmarioDetailComponent implements OnInit {
    armario: IArmario;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ armario }) => {
            this.armario = armario;
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
