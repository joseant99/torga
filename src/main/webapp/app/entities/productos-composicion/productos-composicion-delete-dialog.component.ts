import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductosComposicion } from 'app/shared/model/productos-composicion.model';
import { ProductosComposicionService } from './productos-composicion.service';

@Component({
    selector: 'jhi-productos-composicion-delete-dialog',
    templateUrl: './productos-composicion-delete-dialog.component.html'
})
export class ProductosComposicionDeleteDialogComponent {
    productosComposicion: IProductosComposicion;

    constructor(
        protected productosComposicionService: ProductosComposicionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productosComposicionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productosComposicionListModification',
                content: 'Deleted an productosComposicion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-productos-composicion-delete-popup',
    template: ''
})
export class ProductosComposicionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosComposicion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductosComposicionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productosComposicion = productosComposicion;
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
