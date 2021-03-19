import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoordenadas } from 'app/shared/model/coordenadas.model';
import { CoordenadasService } from './coordenadas.service';

@Component({
    selector: 'jhi-coordenadas-delete-dialog',
    templateUrl: './coordenadas-delete-dialog.component.html'
})
export class CoordenadasDeleteDialogComponent {
    coordenadas: ICoordenadas;

    constructor(
        protected coordenadasService: CoordenadasService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.coordenadasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'coordenadasListModification',
                content: 'Deleted an coordenadas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-coordenadas-delete-popup',
    template: ''
})
export class CoordenadasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coordenadas }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CoordenadasDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.coordenadas = coordenadas;
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
