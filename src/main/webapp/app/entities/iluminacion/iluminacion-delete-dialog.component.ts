import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIluminacion } from 'app/shared/model/iluminacion.model';
import { IluminacionService } from './iluminacion.service';

@Component({
    selector: 'jhi-iluminacion-delete-dialog',
    templateUrl: './iluminacion-delete-dialog.component.html'
})
export class IluminacionDeleteDialogComponent {
    iluminacion: IIluminacion;

    constructor(
        protected iluminacionService: IluminacionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.iluminacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'iluminacionListModification',
                content: 'Deleted an iluminacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-iluminacion-delete-popup',
    template: ''
})
export class IluminacionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iluminacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IluminacionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.iluminacion = iluminacion;
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
