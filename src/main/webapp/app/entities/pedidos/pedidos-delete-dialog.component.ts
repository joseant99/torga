import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPedidos } from 'app/shared/model/pedidos.model';
import { PedidosService } from './pedidos.service';

@Component({
    selector: 'jhi-pedidos-delete-dialog',
    templateUrl: './pedidos-delete-dialog.component.html'
})
export class PedidosDeleteDialogComponent {
    pedidos: IPedidos;

    constructor(protected pedidosService: PedidosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pedidosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pedidosListModification',
                content: 'Deleted an pedidos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pedidos-delete-popup',
    template: ''
})
export class PedidosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pedidos }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PedidosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pedidos = pedidos;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
