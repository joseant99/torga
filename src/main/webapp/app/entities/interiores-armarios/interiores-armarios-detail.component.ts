import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IInterioresArmarios } from 'app/shared/model/interiores-armarios.model';

@Component({
    selector: 'jhi-interiores-armarios-detail',
    templateUrl: './interiores-armarios-detail.component.html'
})
export class InterioresArmariosDetailComponent implements OnInit {
    interioresArmarios: IInterioresArmarios;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interioresArmarios }) => {
            this.interioresArmarios = interioresArmarios;
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
