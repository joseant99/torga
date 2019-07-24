import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { AcaProdService } from './aca-prod.service';

@Component({
    selector: 'jhi-aca-prod-delete-dialog',
    templateUrl: './aca-prod-delete-dialog.component.html'
})
export class AcaProdDeleteDialogComponent {
    acaProd: IAcaProd;

    constructor(protected acaProdService: AcaProdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acaProdService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acaProdListModification',
                content: 'Deleted an acaProd'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-aca-prod-delete-popup',
    template: ''
})
export class AcaProdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acaProd }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AcaProdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.acaProd = acaProd;
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
