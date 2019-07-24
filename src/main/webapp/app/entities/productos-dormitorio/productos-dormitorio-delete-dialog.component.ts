import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from './productos-dormitorio.service';

@Component({
    selector: 'jhi-productos-dormitorio-delete-dialog',
    templateUrl: './productos-dormitorio-delete-dialog.component.html'
})
export class ProductosDormitorioDeleteDialogComponent {
    productosDormitorio: IProductosDormitorio;

    constructor(
        protected productosDormitorioService: ProductosDormitorioService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productosDormitorioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productosDormitorioListModification',
                content: 'Deleted an productosDormitorio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-productos-dormitorio-delete-popup',
    template: ''
})
export class ProductosDormitorioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosDormitorio }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductosDormitorioDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productosDormitorio = productosDormitorio;
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
