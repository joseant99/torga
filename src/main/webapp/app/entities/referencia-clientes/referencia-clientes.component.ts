import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { AccountService } from 'app/core';
import { ReferenciaClientesService } from './referencia-clientes.service';

@Component({
    selector: 'jhi-referencia-clientes',
    templateUrl: './referencia-clientes.component.html'
})
export class ReferenciaClientesComponent implements OnInit, OnDestroy {
    referenciaClientes: IReferenciaClientes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected referenciaClientesService: ReferenciaClientesService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.referenciaClientesService.query().subscribe(
            (res: HttpResponse<IReferenciaClientes[]>) => {
                this.referenciaClientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReferenciaClientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReferenciaClientes) {
        return item.id;
    }

    registerChangeInReferenciaClientes() {
        this.eventSubscriber = this.eventManager.subscribe('referenciaClientesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
