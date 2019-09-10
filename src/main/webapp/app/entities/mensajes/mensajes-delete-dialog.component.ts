import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMensajes } from 'app/shared/model/mensajes.model';
import { MensajesService } from './mensajes.service';

@Component({
    selector: 'jhi-mensajes-delete-dialog',
    templateUrl: './mensajes-delete-dialog.component.html'
})
export class MensajesDeleteDialogComponent {
    mensajes: IMensajes;

    constructor(protected mensajesService: MensajesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mensajesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mensajesListModification',
                content: 'Deleted an mensajes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mensajes-delete-popup',
    template: ''
})
export class MensajesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mensajes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MensajesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mensajes = mensajes;
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
