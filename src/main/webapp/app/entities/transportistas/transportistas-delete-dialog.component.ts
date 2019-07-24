import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportistas } from 'app/shared/model/transportistas.model';
import { TransportistasService } from './transportistas.service';

@Component({
    selector: 'jhi-transportistas-delete-dialog',
    templateUrl: './transportistas-delete-dialog.component.html'
})
export class TransportistasDeleteDialogComponent {
    transportistas: ITransportistas;

    constructor(
        protected transportistasService: TransportistasService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportistasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportistasListModification',
                content: 'Deleted an transportistas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transportistas-delete-popup',
    template: ''
})
export class TransportistasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportistas }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransportistasDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportistas = transportistas;
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
