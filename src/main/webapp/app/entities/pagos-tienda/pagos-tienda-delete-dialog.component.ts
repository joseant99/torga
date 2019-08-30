import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { PagosTiendaService } from './pagos-tienda.service';

@Component({
    selector: 'jhi-pagos-tienda-delete-dialog',
    templateUrl: './pagos-tienda-delete-dialog.component.html'
})
export class PagosTiendaDeleteDialogComponent {
    pagosTienda: IPagosTienda;

    constructor(
        protected pagosTiendaService: PagosTiendaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagosTiendaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pagosTiendaListModification',
                content: 'Deleted an pagosTienda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pagos-tienda-delete-popup',
    template: ''
})
export class PagosTiendaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagosTienda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PagosTiendaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pagosTienda = pagosTienda;
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
