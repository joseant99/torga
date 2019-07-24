import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { CategoriasDormiService } from './categorias-dormi.service';

@Component({
    selector: 'jhi-categorias-dormi-delete-dialog',
    templateUrl: './categorias-dormi-delete-dialog.component.html'
})
export class CategoriasDormiDeleteDialogComponent {
    categoriasDormi: ICategoriasDormi;

    constructor(
        protected categoriasDormiService: CategoriasDormiService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriasDormiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoriasDormiListModification',
                content: 'Deleted an categoriasDormi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categorias-dormi-delete-popup',
    template: ''
})
export class CategoriasDormiDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoriasDormi }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoriasDormiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.categoriasDormi = categoriasDormi;
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
