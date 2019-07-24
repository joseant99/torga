import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITiposApoyo } from 'app/shared/model/tipos-apoyo.model';
import { TiposApoyoService } from './tipos-apoyo.service';

@Component({
    selector: 'jhi-tipos-apoyo-delete-dialog',
    templateUrl: './tipos-apoyo-delete-dialog.component.html'
})
export class TiposApoyoDeleteDialogComponent {
    tiposApoyo: ITiposApoyo;

    constructor(
        protected tiposApoyoService: TiposApoyoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tiposApoyoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tiposApoyoListModification',
                content: 'Deleted an tiposApoyo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipos-apoyo-delete-popup',
    template: ''
})
export class TiposApoyoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tiposApoyo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TiposApoyoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tiposApoyo = tiposApoyo;
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
