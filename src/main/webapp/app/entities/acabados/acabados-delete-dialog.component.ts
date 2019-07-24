import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from './acabados.service';

@Component({
    selector: 'jhi-acabados-delete-dialog',
    templateUrl: './acabados-delete-dialog.component.html'
})
export class AcabadosDeleteDialogComponent {
    acabados: IAcabados;

    constructor(protected acabadosService: AcabadosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acabadosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acabadosListModification',
                content: 'Deleted an acabados'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acabados-delete-popup',
    template: ''
})
export class AcabadosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabados }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AcabadosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.acabados = acabados;
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
