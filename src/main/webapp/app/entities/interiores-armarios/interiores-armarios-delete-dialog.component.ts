import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInterioresArmarios } from 'app/shared/model/interiores-armarios.model';
import { InterioresArmariosService } from './interiores-armarios.service';

@Component({
    selector: 'jhi-interiores-armarios-delete-dialog',
    templateUrl: './interiores-armarios-delete-dialog.component.html'
})
export class InterioresArmariosDeleteDialogComponent {
    interioresArmarios: IInterioresArmarios;

    constructor(
        protected interioresArmariosService: InterioresArmariosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interioresArmariosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'interioresArmariosListModification',
                content: 'Deleted an interioresArmarios'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interiores-armarios-delete-popup',
    template: ''
})
export class InterioresArmariosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interioresArmarios }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InterioresArmariosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.interioresArmarios = interioresArmarios;
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
