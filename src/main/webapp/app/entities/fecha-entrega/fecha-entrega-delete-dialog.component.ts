import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFecha_entrega } from 'app/shared/model/fecha-entrega.model';
import { Fecha_entregaService } from './fecha-entrega.service';

@Component({
    selector: 'jhi-fecha-entrega-delete-dialog',
    templateUrl: './fecha-entrega-delete-dialog.component.html'
})
export class Fecha_entregaDeleteDialogComponent {
    fecha_entrega: IFecha_entrega;

    constructor(
        protected fecha_entregaService: Fecha_entregaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fecha_entregaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fecha_entregaListModification',
                content: 'Deleted an fecha_entrega'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fecha-entrega-delete-popup',
    template: ''
})
export class Fecha_entregaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fecha_entrega }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Fecha_entregaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fecha_entrega = fecha_entrega;
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
