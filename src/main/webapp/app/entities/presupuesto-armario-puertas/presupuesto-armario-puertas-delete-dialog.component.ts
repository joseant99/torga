import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';
import { PresupuestoArmarioPuertasService } from './presupuesto-armario-puertas.service';

@Component({
    selector: 'jhi-presupuesto-armario-puertas-delete-dialog',
    templateUrl: './presupuesto-armario-puertas-delete-dialog.component.html'
})
export class PresupuestoArmarioPuertasDeleteDialogComponent {
    presupuestoArmarioPuertas: IPresupuestoArmarioPuertas;

    constructor(
        protected presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.presupuestoArmarioPuertasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'presupuestoArmarioPuertasListModification',
                content: 'Deleted an presupuestoArmarioPuertas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-presupuesto-armario-puertas-delete-popup',
    template: ''
})
export class PresupuestoArmarioPuertasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoArmarioPuertas }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PresupuestoArmarioPuertasDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.presupuestoArmarioPuertas = presupuestoArmarioPuertas;
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
