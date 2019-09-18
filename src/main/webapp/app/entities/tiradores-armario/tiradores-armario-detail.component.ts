import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITiradoresArmario } from 'app/shared/model/tiradores-armario.model';

@Component({
    selector: 'jhi-tiradores-armario-detail',
    templateUrl: './tiradores-armario-detail.component.html'
})
export class TiradoresArmarioDetailComponent implements OnInit {
    tiradoresArmario: ITiradoresArmario;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tiradoresArmario }) => {
            this.tiradoresArmario = tiradoresArmario;
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
