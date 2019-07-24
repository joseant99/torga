import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAcaProd } from 'app/shared/model/aca-prod.model';

@Component({
    selector: 'jhi-aca-prod-detail',
    templateUrl: './aca-prod-detail.component.html'
})
export class AcaProdDetailComponent implements OnInit {
    acaProd: IAcaProd;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acaProd }) => {
            this.acaProd = acaProd;
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
