import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';
import { PresupuestoArmarioInterioresService } from './presupuesto-armario-interiores.service';

@Component({
    selector: 'jhi-presupuesto-armario-interiores-delete-dialog',
    templateUrl: './presupuesto-armario-interiores-delete-dialog.component.html'
})
export class PresupuestoArmarioInterioresDeleteDialogComponent {
    presupuestoArmarioInteriores: IPresupuestoArmarioInteriores;

    constructor(
        protected presupuestoArmarioInterioresService: PresupuestoArmarioInterioresService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.presupuestoArmarioInterioresService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'presupuestoArmarioInterioresListModification',
                content: 'Deleted an presupuestoArmarioInteriores'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-presupuesto-armario-interiores-delete-popup',
    template: ''
})
export class PresupuestoArmarioInterioresDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoArmarioInteriores }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PresupuestoArmarioInterioresDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.presupuestoArmarioInteriores = presupuestoArmarioInteriores;
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
