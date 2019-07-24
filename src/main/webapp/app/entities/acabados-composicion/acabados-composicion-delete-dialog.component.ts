import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcabadosComposicion } from 'app/shared/model/acabados-composicion.model';
import { AcabadosComposicionService } from './acabados-composicion.service';

@Component({
    selector: 'jhi-acabados-composicion-delete-dialog',
    templateUrl: './acabados-composicion-delete-dialog.component.html'
})
export class AcabadosComposicionDeleteDialogComponent {
    acabadosComposicion: IAcabadosComposicion;

    constructor(
        protected acabadosComposicionService: AcabadosComposicionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acabadosComposicionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acabadosComposicionListModification',
                content: 'Deleted an acabadosComposicion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acabados-composicion-delete-popup',
    template: ''
})
export class AcabadosComposicionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabadosComposicion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AcabadosComposicionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.acabadosComposicion = acabadosComposicion;
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
