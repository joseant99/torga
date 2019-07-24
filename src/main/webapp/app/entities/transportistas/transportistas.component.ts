import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransportistas } from 'app/shared/model/transportistas.model';
import { AccountService } from 'app/core';
import { TransportistasService } from './transportistas.service';

@Component({
    selector: 'jhi-transportistas',
    templateUrl: './transportistas.component.html'
})
export class TransportistasComponent implements OnInit, OnDestroy {
    transportistas: ITransportistas[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected transportistasService: TransportistasService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.transportistasService.query().subscribe(
            (res: HttpResponse<ITransportistas[]>) => {
                this.transportistas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransportistas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportistas) {
        return item.id;
    }

    registerChangeInTransportistas() {
        this.eventSubscriber = this.eventManager.subscribe('transportistasListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
