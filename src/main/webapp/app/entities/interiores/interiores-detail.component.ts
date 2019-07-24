import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IInteriores } from 'app/shared/model/interiores.model';

@Component({
    selector: 'jhi-interiores-detail',
    templateUrl: './interiores-detail.component.html'
})
export class InterioresDetailComponent implements OnInit {
    interiores: IInteriores;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interiores }) => {
            this.interiores = interiores;
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
