import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';
import { ImagenesContactoFabricaService } from './imagenes-contacto-fabrica.service';

@Component({
    selector: 'jhi-imagenes-contacto-fabrica-delete-dialog',
    templateUrl: './imagenes-contacto-fabrica-delete-dialog.component.html'
})
export class ImagenesContactoFabricaDeleteDialogComponent {
    imagenesContactoFabrica: IImagenesContactoFabrica;

    constructor(
        protected imagenesContactoFabricaService: ImagenesContactoFabricaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.imagenesContactoFabricaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'imagenesContactoFabricaListModification',
                content: 'Deleted an imagenesContactoFabrica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-imagenes-contacto-fabrica-delete-popup',
    template: ''
})
export class ImagenesContactoFabricaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imagenesContactoFabrica }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImagenesContactoFabricaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.imagenesContactoFabrica = imagenesContactoFabrica;
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
