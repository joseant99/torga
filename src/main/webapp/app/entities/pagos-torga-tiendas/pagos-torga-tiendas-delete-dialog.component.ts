import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';
import { PagosTorgaTiendasService } from './pagos-torga-tiendas.service';

@Component({
    selector: 'jhi-pagos-torga-tiendas-delete-dialog',
    templateUrl: './pagos-torga-tiendas-delete-dialog.component.html'
})
export class PagosTorgaTiendasDeleteDialogComponent {
    pagosTorgaTiendas: IPagosTorgaTiendas;

    constructor(
        protected pagosTorgaTiendasService: PagosTorgaTiendasService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagosTorgaTiendasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pagosTorgaTiendasListModification',
                content: 'Deleted an pagosTorgaTiendas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pagos-torga-tiendas-delete-popup',
    template: ''
})
export class PagosTorgaTiendasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagosTorgaTiendas }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PagosTorgaTiendasDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pagosTorgaTiendas = pagosTorgaTiendas;
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
