import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';
import { IvaProductoTiendaService } from './iva-producto-tienda.service';

@Component({
    selector: 'jhi-iva-producto-tienda-delete-dialog',
    templateUrl: './iva-producto-tienda-delete-dialog.component.html'
})
export class IvaProductoTiendaDeleteDialogComponent {
    ivaProductoTienda: IIvaProductoTienda;

    constructor(
        protected ivaProductoTiendaService: IvaProductoTiendaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ivaProductoTiendaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ivaProductoTiendaListModification',
                content: 'Deleted an ivaProductoTienda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-iva-producto-tienda-delete-popup',
    template: ''
})
export class IvaProductoTiendaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ivaProductoTienda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IvaProductoTiendaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ivaProductoTienda = ivaProductoTienda;
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
