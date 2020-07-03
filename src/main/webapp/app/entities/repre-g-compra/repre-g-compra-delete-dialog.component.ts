import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepreGCompra } from 'app/shared/model/repre-g-compra.model';
import { RepreGCompraService } from './repre-g-compra.service';

@Component({
    selector: 'jhi-repre-g-compra-delete-dialog',
    templateUrl: './repre-g-compra-delete-dialog.component.html'
})
export class RepreGCompraDeleteDialogComponent {
    repreGCompra: IRepreGCompra;

    constructor(
        protected repreGCompraService: RepreGCompraService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.repreGCompraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'repreGCompraListModification',
                content: 'Deleted an repreGCompra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-repre-g-compra-delete-popup',
    template: ''
})
export class RepreGCompraDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ repreGCompra }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RepreGCompraDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.repreGCompra = repreGCompra;
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
