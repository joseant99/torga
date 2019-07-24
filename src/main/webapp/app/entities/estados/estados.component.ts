import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstados } from 'app/shared/model/estados.model';
import { AccountService } from 'app/core';
import { EstadosService } from './estados.service';

@Component({
    selector: 'jhi-estados',
    templateUrl: './estados.component.html'
})
export class EstadosComponent implements OnInit, OnDestroy {
    estados: IEstados[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected estadosService: EstadosService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.estadosService.query().subscribe(
            (res: HttpResponse<IEstados[]>) => {
                this.estados = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstados) {
        return item.id;
    }

    registerChangeInEstados() {
        this.eventSubscriber = this.eventManager.subscribe('estadosListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
