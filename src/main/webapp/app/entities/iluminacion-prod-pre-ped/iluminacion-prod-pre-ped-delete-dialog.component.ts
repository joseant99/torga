import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';
import { IluminacionProdPrePedService } from './iluminacion-prod-pre-ped.service';

@Component({
    selector: 'jhi-iluminacion-prod-pre-ped-delete-dialog',
    templateUrl: './iluminacion-prod-pre-ped-delete-dialog.component.html'
})
export class IluminacionProdPrePedDeleteDialogComponent {
    iluminacionProdPrePed: IIluminacionProdPrePed;

    constructor(
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.iluminacionProdPrePedService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'iluminacionProdPrePedListModification',
                content: 'Deleted an iluminacionProdPrePed'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-iluminacion-prod-pre-ped-delete-popup',
    template: ''
})
export class IluminacionProdPrePedDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iluminacionProdPrePed }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IluminacionProdPrePedDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.iluminacionProdPrePed = iluminacionProdPrePed;
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
