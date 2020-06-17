import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INiveladores } from 'app/shared/model/niveladores.model';
import { NiveladoresService } from './niveladores.service';

@Component({
    selector: 'jhi-niveladores-delete-dialog',
    templateUrl: './niveladores-delete-dialog.component.html'
})
export class NiveladoresDeleteDialogComponent {
    niveladores: INiveladores;

    constructor(
        protected niveladoresService: NiveladoresService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.niveladoresService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'niveladoresListModification',
                content: 'Deleted an niveladores'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-niveladores-delete-popup',
    template: ''
})
export class NiveladoresDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ niveladores }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NiveladoresDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.niveladores = niveladores;
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
