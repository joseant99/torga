import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcabadosProducto } from 'app/shared/model/acabados-producto.model';
import { AcabadosProductoService } from './acabados-producto.service';

@Component({
    selector: 'jhi-acabados-producto-delete-dialog',
    templateUrl: './acabados-producto-delete-dialog.component.html'
})
export class AcabadosProductoDeleteDialogComponent {
    acabadosProducto: IAcabadosProducto;

    constructor(
        protected acabadosProductoService: AcabadosProductoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acabadosProductoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acabadosProductoListModification',
                content: 'Deleted an acabadosProducto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acabados-producto-delete-popup',
    template: ''
})
export class AcabadosProductoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabadosProducto }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AcabadosProductoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.acabadosProducto = acabadosProducto;
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
