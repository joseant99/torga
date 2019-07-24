import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IComposicion } from 'app/shared/model/composicion.model';

@Component({
    selector: 'jhi-composicion-detail',
    templateUrl: './composicion-detail.component.html'
})
export class ComposicionDetailComponent implements OnInit {
    composicion: IComposicion;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ composicion }) => {
            this.composicion = composicion;
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
