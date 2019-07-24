import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILogistica } from 'app/shared/model/logistica.model';

@Component({
    selector: 'jhi-logistica-detail',
    templateUrl: './logistica-detail.component.html'
})
export class LogisticaDetailComponent implements OnInit {
    logistica: ILogistica;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ logistica }) => {
            this.logistica = logistica;
            console.log('AQUIIIIIII');
            console.log(this.logistica);
        });
    }

    previousState() {
        window.history.back();
    }
}
