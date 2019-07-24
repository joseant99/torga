import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';
import { DimensionesProductoTipoService } from './dimensiones-producto-tipo.service';

@Component({
    selector: 'jhi-dimensiones-producto-tipo-delete-dialog',
    templateUrl: './dimensiones-producto-tipo-delete-dialog.component.html'
})
export class DimensionesProductoTipoDeleteDialogComponent {
    dimensionesProductoTipo: IDimensionesProductoTipo;

    constructor(
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dimensionesProductoTipoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dimensionesProductoTipoListModification',
                content: 'Deleted an dimensionesProductoTipo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dimensiones-producto-tipo-delete-popup',
    template: ''
})
export class DimensionesProductoTipoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dimensionesProductoTipo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DimensionesProductoTipoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.dimensionesProductoTipo = dimensionesProductoTipo;
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
