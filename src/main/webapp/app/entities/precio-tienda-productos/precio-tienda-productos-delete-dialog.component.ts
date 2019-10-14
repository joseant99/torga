import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';
import { PrecioTiendaProductosService } from './precio-tienda-productos.service';

@Component({
    selector: 'jhi-precio-tienda-productos-delete-dialog',
    templateUrl: './precio-tienda-productos-delete-dialog.component.html'
})
export class PrecioTiendaProductosDeleteDialogComponent {
    precioTiendaProductos: IPrecioTiendaProductos;

    constructor(
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.precioTiendaProductosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'precioTiendaProductosListModification',
                content: 'Deleted an precioTiendaProductos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-precio-tienda-productos-delete-popup',
    template: ''
})
export class PrecioTiendaProductosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ precioTiendaProductos }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrecioTiendaProductosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.precioTiendaProductos = precioTiendaProductos;
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
