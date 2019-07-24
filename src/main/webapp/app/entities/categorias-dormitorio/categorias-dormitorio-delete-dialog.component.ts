import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';
import { Categorias_DormitorioService } from './categorias-dormitorio.service';

@Component({
    selector: 'jhi-categorias-dormitorio-delete-dialog',
    templateUrl: './categorias-dormitorio-delete-dialog.component.html'
})
export class Categorias_DormitorioDeleteDialogComponent {
    categorias_Dormitorio: ICategorias_Dormitorio;

    constructor(
        protected categorias_DormitorioService: Categorias_DormitorioService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categorias_DormitorioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categorias_DormitorioListModification',
                content: 'Deleted an categorias_Dormitorio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categorias-dormitorio-delete-popup',
    template: ''
})
export class Categorias_DormitorioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categorias_Dormitorio }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(Categorias_DormitorioDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.categorias_Dormitorio = categorias_Dormitorio;
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
