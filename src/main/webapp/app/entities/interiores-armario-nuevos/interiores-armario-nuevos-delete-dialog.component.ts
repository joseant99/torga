import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';
import { InterioresArmarioNuevosService } from './interiores-armario-nuevos.service';

@Component({
    selector: 'jhi-interiores-armario-nuevos-delete-dialog',
    templateUrl: './interiores-armario-nuevos-delete-dialog.component.html'
})
export class InterioresArmarioNuevosDeleteDialogComponent {
    interioresArmarioNuevos: IInterioresArmarioNuevos;

    constructor(
        protected interioresArmarioNuevosService: InterioresArmarioNuevosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interioresArmarioNuevosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'interioresArmarioNuevosListModification',
                content: 'Deleted an interioresArmarioNuevos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interiores-armario-nuevos-delete-popup',
    template: ''
})
export class InterioresArmarioNuevosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interioresArmarioNuevos }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InterioresArmarioNuevosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.interioresArmarioNuevos = interioresArmarioNuevos;
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
