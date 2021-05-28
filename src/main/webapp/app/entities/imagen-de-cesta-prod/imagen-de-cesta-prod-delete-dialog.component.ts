import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';
import { ImagenDeCestaProdService } from './imagen-de-cesta-prod.service';

@Component({
    selector: 'jhi-imagen-de-cesta-prod-delete-dialog',
    templateUrl: './imagen-de-cesta-prod-delete-dialog.component.html'
})
export class ImagenDeCestaProdDeleteDialogComponent {
    imagenDeCestaProd: IImagenDeCestaProd;

    constructor(
        protected imagenDeCestaProdService: ImagenDeCestaProdService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.imagenDeCestaProdService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'imagenDeCestaProdListModification',
                content: 'Deleted an imagenDeCestaProd'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-imagen-de-cesta-prod-delete-popup',
    template: ''
})
export class ImagenDeCestaProdDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imagenDeCestaProd }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImagenDeCestaProdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.imagenDeCestaProd = imagenDeCestaProd;
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
