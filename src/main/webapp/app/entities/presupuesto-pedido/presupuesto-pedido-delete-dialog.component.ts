import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';

@Component({
    selector: 'jhi-presupuesto-pedido-delete-dialog',
    templateUrl: './presupuesto-pedido-delete-dialog.component.html'
})
export class PresupuestoPedidoDeleteDialogComponent {
    presupuestoPedido: IPresupuestoPedido;

    constructor(
        protected presupuestoPedidoService: PresupuestoPedidoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.presupuestoPedidoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'presupuestoPedidoListModification',
                content: 'Deleted an presupuestoPedido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-presupuesto-pedido-delete-popup',
    template: ''
})
export class PresupuestoPedidoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoPedido }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PresupuestoPedidoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.presupuestoPedido = presupuestoPedido;
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
