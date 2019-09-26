import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrecioTienda } from 'app/shared/model/precio-tienda.model';
import { PrecioTiendaService } from './precio-tienda.service';

@Component({
    selector: 'jhi-precio-tienda-delete-dialog',
    templateUrl: './precio-tienda-delete-dialog.component.html'
})
export class PrecioTiendaDeleteDialogComponent {
    precioTienda: IPrecioTienda;

    constructor(
        protected precioTiendaService: PrecioTiendaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.precioTiendaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'precioTiendaListModification',
                content: 'Deleted an precioTienda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-precio-tienda-delete-popup',
    template: ''
})
export class PrecioTiendaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ precioTienda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrecioTiendaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.precioTienda = precioTienda;
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
