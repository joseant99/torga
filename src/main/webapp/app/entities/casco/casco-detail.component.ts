import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICasco } from 'app/shared/model/casco.model';

@Component({
    selector: 'jhi-casco-detail',
    templateUrl: './casco-detail.component.html'
})
export class CascoDetailComponent implements OnInit {
    casco: ICasco;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ casco }) => {
            this.casco = casco;
        });
    }

    previousState() {
        window.history.back();
    }
}
