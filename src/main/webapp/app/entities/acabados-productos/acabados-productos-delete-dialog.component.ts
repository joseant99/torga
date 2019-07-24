import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcabados_Productos } from 'app/shared/model/acabados-productos.model';
import { Acabados_ProductosService } from './acabados-productos.service';

@Component({
    selector: 'jhi-acabados-productos-delete-dialog',
    templateUrl: './acabados-productos-delete-dialog.component.html'
})
export class Acabados_ProductosDeleteDialogComponent {
    acabados_Productos: IAcabados_Productos;

    constructor(
        protected acabados_ProductosService: Acabados_ProductosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acabados_ProductosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acabados_ProductosListModification',
                content: 'Deleted an acabados_Productos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acabados-productos-delete-popup',
    template: ''
})
export class Acabados_ProductosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabados_Productos }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Acabados_ProductosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.acabados_Productos = acabados_Productos;
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
