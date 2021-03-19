import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExposicion } from 'app/shared/model/exposicion.model';
import { ExposicionService } from './exposicion.service';

@Component({
    selector: 'jhi-exposicion-delete-dialog',
    templateUrl: './exposicion-delete-dialog.component.html'
})
export class ExposicionDeleteDialogComponent {
    exposicion: IExposicion;

    constructor(
        protected exposicionService: ExposicionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exposicionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exposicionListModification',
                content: 'Deleted an exposicion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-exposicion-delete-popup',
    template: ''
})
export class ExposicionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ exposicion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExposicionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.exposicion = exposicion;
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
