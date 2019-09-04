import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedidasEspeciales } from 'app/shared/model/medidas-especiales.model';
import { MedidasEspecialesService } from './medidas-especiales.service';

@Component({
    selector: 'jhi-medidas-especiales-delete-dialog',
    templateUrl: './medidas-especiales-delete-dialog.component.html'
})
export class MedidasEspecialesDeleteDialogComponent {
    medidasEspeciales: IMedidasEspeciales;

    constructor(
        protected medidasEspecialesService: MedidasEspecialesService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medidasEspecialesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medidasEspecialesListModification',
                content: 'Deleted an medidasEspeciales'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medidas-especiales-delete-popup',
    template: ''
})
export class MedidasEspecialesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medidasEspeciales }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedidasEspecialesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medidasEspeciales = medidasEspeciales;
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
