import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';
import { InteriorArmarioMedidaService } from './interior-armario-medida.service';

@Component({
    selector: 'jhi-interior-armario-medida-delete-dialog',
    templateUrl: './interior-armario-medida-delete-dialog.component.html'
})
export class InteriorArmarioMedidaDeleteDialogComponent {
    interiorArmarioMedida: IInteriorArmarioMedida;

    constructor(
        protected interiorArmarioMedidaService: InteriorArmarioMedidaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interiorArmarioMedidaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'interiorArmarioMedidaListModification',
                content: 'Deleted an interiorArmarioMedida'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interior-armario-medida-delete-popup',
    template: ''
})
export class InteriorArmarioMedidaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interiorArmarioMedida }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InteriorArmarioMedidaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.interiorArmarioMedida = interiorArmarioMedida;
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
