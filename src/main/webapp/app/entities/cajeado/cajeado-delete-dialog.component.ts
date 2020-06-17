import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICajeado } from 'app/shared/model/cajeado.model';
import { CajeadoService } from './cajeado.service';

@Component({
    selector: 'jhi-cajeado-delete-dialog',
    templateUrl: './cajeado-delete-dialog.component.html'
})
export class CajeadoDeleteDialogComponent {
    cajeado: ICajeado;

    constructor(protected cajeadoService: CajeadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cajeadoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cajeadoListModification',
                content: 'Deleted an cajeado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cajeado-delete-popup',
    template: ''
})
export class CajeadoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cajeado }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CajeadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cajeado = cajeado;
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
