import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVendedores } from 'app/shared/model/vendedores.model';
import { VendedoresService } from './vendedores.service';

@Component({
    selector: 'jhi-vendedores-delete-dialog',
    templateUrl: './vendedores-delete-dialog.component.html'
})
export class VendedoresDeleteDialogComponent {
    vendedores: IVendedores;

    constructor(
        protected vendedoresService: VendedoresService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vendedoresService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vendedoresListModification',
                content: 'Deleted an vendedores'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vendedores-delete-popup',
    template: ''
})
export class VendedoresDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vendedores }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VendedoresDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.vendedores = vendedores;
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
