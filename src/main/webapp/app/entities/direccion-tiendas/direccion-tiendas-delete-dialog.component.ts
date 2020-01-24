import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDireccionTiendas } from 'app/shared/model/direccion-tiendas.model';
import { DireccionTiendasService } from './direccion-tiendas.service';

@Component({
    selector: 'jhi-direccion-tiendas-delete-dialog',
    templateUrl: './direccion-tiendas-delete-dialog.component.html'
})
export class DireccionTiendasDeleteDialogComponent {
    direccionTiendas: IDireccionTiendas;

    constructor(
        protected direccionTiendasService: DireccionTiendasService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.direccionTiendasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'direccionTiendasListModification',
                content: 'Deleted an direccionTiendas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-direccion-tiendas-delete-popup',
    template: ''
})
export class DireccionTiendasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ direccionTiendas }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DireccionTiendasDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.direccionTiendas = direccionTiendas;
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
