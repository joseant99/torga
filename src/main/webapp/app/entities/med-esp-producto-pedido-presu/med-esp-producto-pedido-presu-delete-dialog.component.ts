import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';
import { MedEspProductoPedidoPresuService } from './med-esp-producto-pedido-presu.service';

@Component({
    selector: 'jhi-med-esp-producto-pedido-presu-delete-dialog',
    templateUrl: './med-esp-producto-pedido-presu-delete-dialog.component.html'
})
export class MedEspProductoPedidoPresuDeleteDialogComponent {
    medEspProductoPedidoPresu: IMedEspProductoPedidoPresu;

    constructor(
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medEspProductoPedidoPresuService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medEspProductoPedidoPresuListModification',
                content: 'Deleted an medEspProductoPedidoPresu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-med-esp-producto-pedido-presu-delete-popup',
    template: ''
})
export class MedEspProductoPedidoPresuDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medEspProductoPedidoPresu }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedEspProductoPedidoPresuDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medEspProductoPedidoPresu = medEspProductoPedidoPresu;
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
