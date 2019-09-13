import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';
import { InteriorArmarioDentroService } from './interior-armario-dentro.service';

@Component({
    selector: 'jhi-interior-armario-dentro-delete-dialog',
    templateUrl: './interior-armario-dentro-delete-dialog.component.html'
})
export class InteriorArmarioDentroDeleteDialogComponent {
    interiorArmarioDentro: IInteriorArmarioDentro;

    constructor(
        protected interiorArmarioDentroService: InteriorArmarioDentroService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interiorArmarioDentroService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'interiorArmarioDentroListModification',
                content: 'Deleted an interiorArmarioDentro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interior-armario-dentro-delete-popup',
    template: ''
})
export class InteriorArmarioDentroDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interiorArmarioDentro }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InteriorArmarioDentroDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.interiorArmarioDentro = interiorArmarioDentro;
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
