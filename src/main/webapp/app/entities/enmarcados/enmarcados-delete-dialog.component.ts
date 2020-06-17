import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnmarcados } from 'app/shared/model/enmarcados.model';
import { EnmarcadosService } from './enmarcados.service';

@Component({
    selector: 'jhi-enmarcados-delete-dialog',
    templateUrl: './enmarcados-delete-dialog.component.html'
})
export class EnmarcadosDeleteDialogComponent {
    enmarcados: IEnmarcados;

    constructor(
        protected enmarcadosService: EnmarcadosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enmarcadosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'enmarcadosListModification',
                content: 'Deleted an enmarcados'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enmarcados-delete-popup',
    template: ''
})
export class EnmarcadosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enmarcados }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EnmarcadosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.enmarcados = enmarcados;
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
