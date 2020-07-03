import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportistaTabla } from 'app/shared/model/transportista-tabla.model';
import { TransportistaTablaService } from './transportista-tabla.service';

@Component({
    selector: 'jhi-transportista-tabla-delete-dialog',
    templateUrl: './transportista-tabla-delete-dialog.component.html'
})
export class TransportistaTablaDeleteDialogComponent {
    transportistaTabla: ITransportistaTabla;

    constructor(
        protected transportistaTablaService: TransportistaTablaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportistaTablaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportistaTablaListModification',
                content: 'Deleted an transportistaTabla'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transportista-tabla-delete-popup',
    template: ''
})
export class TransportistaTablaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportistaTabla }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransportistaTablaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportistaTabla = transportistaTabla;
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
