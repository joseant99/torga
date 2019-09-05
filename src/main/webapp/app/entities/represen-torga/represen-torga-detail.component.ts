import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepresenTorga } from 'app/shared/model/represen-torga.model';

@Component({
    selector: 'jhi-represen-torga-detail',
    templateUrl: './represen-torga-detail.component.html'
})
export class RepresenTorgaDetailComponent implements OnInit {
    represenTorga: IRepresenTorga;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ represenTorga }) => {
            this.represenTorga = represenTorga;
        });
    }

    previousState() {
        window.history.back();
    }
}
