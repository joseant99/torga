import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInteriores } from 'app/shared/model/interiores.model';
import { InterioresService } from './interiores.service';

@Component({
    selector: 'jhi-interiores-delete-dialog',
    templateUrl: './interiores-delete-dialog.component.html'
})
export class InterioresDeleteDialogComponent {
    interiores: IInteriores;

    constructor(
        protected interioresService: InterioresService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interioresService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'interioresListModification',
                content: 'Deleted an interiores'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interiores-delete-popup',
    template: ''
})
export class InterioresDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interiores }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InterioresDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.interiores = interiores;
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
