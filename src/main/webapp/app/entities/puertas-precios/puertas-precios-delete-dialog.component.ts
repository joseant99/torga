import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPuertasPrecios } from 'app/shared/model/puertas-precios.model';
import { PuertasPreciosService } from './puertas-precios.service';

@Component({
    selector: 'jhi-puertas-precios-delete-dialog',
    templateUrl: './puertas-precios-delete-dialog.component.html'
})
export class PuertasPreciosDeleteDialogComponent {
    puertasPrecios: IPuertasPrecios;

    constructor(
        protected puertasPreciosService: PuertasPreciosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.puertasPreciosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'puertasPreciosListModification',
                content: 'Deleted an puertasPrecios'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-puertas-precios-delete-popup',
    template: ''
})
export class PuertasPreciosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ puertasPrecios }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PuertasPreciosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.puertasPrecios = puertasPrecios;
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
