import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';
import { PrecioFinalPresuService } from './precio-final-presu.service';

@Component({
    selector: 'jhi-precio-final-presu-delete-dialog',
    templateUrl: './precio-final-presu-delete-dialog.component.html'
})
export class PrecioFinalPresuDeleteDialogComponent {
    precioFinalPresu: IPrecioFinalPresu;

    constructor(
        protected precioFinalPresuService: PrecioFinalPresuService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.precioFinalPresuService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'precioFinalPresuListModification',
                content: 'Deleted an precioFinalPresu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-precio-final-presu-delete-popup',
    template: ''
})
export class PrecioFinalPresuDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ precioFinalPresu }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrecioFinalPresuDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.precioFinalPresu = precioFinalPresu;
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
