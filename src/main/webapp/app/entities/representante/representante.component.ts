import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRepresentante } from 'app/shared/model/representante.model';
import { AccountService } from 'app/core';
import { RepresentanteService } from './representante.service';

@Component({
    selector: 'jhi-representante',
    templateUrl: './representante.component.html'
})
export class RepresentanteComponent implements OnInit, OnDestroy {
    representantes: IRepresentante[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected representanteService: RepresentanteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.representanteService.query().subscribe(
            (res: HttpResponse<IRepresentante[]>) => {
                this.representantes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRepresentantes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRepresentante) {
        return item.id;
    }

    registerChangeInRepresentantes() {
        this.eventSubscriber = this.eventManager.subscribe('representanteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
