import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITiposApoyo } from 'app/shared/model/tipos-apoyo.model';

@Component({
    selector: 'jhi-tipos-apoyo-detail',
    templateUrl: './tipos-apoyo-detail.component.html'
})
export class TiposApoyoDetailComponent implements OnInit {
    tiposApoyo: ITiposApoyo;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tiposApoyo }) => {
            this.tiposApoyo = tiposApoyo;
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
