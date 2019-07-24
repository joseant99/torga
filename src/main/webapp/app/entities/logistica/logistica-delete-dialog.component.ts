import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILogistica } from 'app/shared/model/logistica.model';
import { LogisticaService } from './logistica.service';

@Component({
    selector: 'jhi-logistica-delete-dialog',
    templateUrl: './logistica-delete-dialog.component.html'
})
export class LogisticaDeleteDialogComponent {
    logistica: ILogistica;

    constructor(
        protected logisticaService: LogisticaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.logisticaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'logisticaListModification',
                content: 'Deleted an logistica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-logistica-delete-popup',
    template: ''
})
export class LogisticaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ logistica }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LogisticaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.logistica = logistica;
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
