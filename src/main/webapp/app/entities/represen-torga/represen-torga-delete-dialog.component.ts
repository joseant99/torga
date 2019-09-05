import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
import { RepresenTorgaService } from './represen-torga.service';

@Component({
    selector: 'jhi-represen-torga-delete-dialog',
    templateUrl: './represen-torga-delete-dialog.component.html'
})
export class RepresenTorgaDeleteDialogComponent {
    represenTorga: IRepresenTorga;

    constructor(
        protected represenTorgaService: RepresenTorgaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.represenTorgaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'represenTorgaListModification',
                content: 'Deleted an represenTorga'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-represen-torga-delete-popup',
    template: ''
})
export class RepresenTorgaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ represenTorga }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RepresenTorgaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.represenTorga = represenTorga;
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
