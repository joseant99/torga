import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';
import { DimensionesProductoService } from './dimensiones-producto.service';

@Component({
    selector: 'jhi-dimensiones-producto-delete-dialog',
    templateUrl: './dimensiones-producto-delete-dialog.component.html'
})
export class DimensionesProductoDeleteDialogComponent {
    dimensionesProducto: IDimensionesProducto;

    constructor(
        protected dimensionesProductoService: DimensionesProductoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dimensionesProductoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dimensionesProductoListModification',
                content: 'Deleted an dimensionesProducto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dimensiones-producto-delete-popup',
    template: ''
})
export class DimensionesProductoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dimensionesProducto }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DimensionesProductoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.dimensionesProducto = dimensionesProducto;
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
