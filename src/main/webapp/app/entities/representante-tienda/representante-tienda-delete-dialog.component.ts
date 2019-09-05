import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepresentanteTienda } from 'app/shared/model/representante-tienda.model';
import { RepresentanteTiendaService } from './representante-tienda.service';

@Component({
    selector: 'jhi-representante-tienda-delete-dialog',
    templateUrl: './representante-tienda-delete-dialog.component.html'
})
export class RepresentanteTiendaDeleteDialogComponent {
    representanteTienda: IRepresentanteTienda;

    constructor(
        protected representanteTiendaService: RepresentanteTiendaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.representanteTiendaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'representanteTiendaListModification',
                content: 'Deleted an representanteTienda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-representante-tienda-delete-popup',
    template: ''
})
export class RepresentanteTiendaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ representanteTienda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RepresentanteTiendaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.representanteTienda = representanteTienda;
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
