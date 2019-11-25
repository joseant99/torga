import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';
import { PresupuestoArmarioService } from './presupuesto-armario.service';

@Component({
    selector: 'jhi-presupuesto-armario-delete-dialog',
    templateUrl: './presupuesto-armario-delete-dialog.component.html'
})
export class PresupuestoArmarioDeleteDialogComponent {
    presupuestoArmario: IPresupuestoArmario;

    constructor(
        protected presupuestoArmarioService: PresupuestoArmarioService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.presupuestoArmarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'presupuestoArmarioListModification',
                content: 'Deleted an presupuestoArmario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-presupuesto-armario-delete-popup',
    template: ''
})
export class PresupuestoArmarioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoArmario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PresupuestoArmarioDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.presupuestoArmario = presupuestoArmario;
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
