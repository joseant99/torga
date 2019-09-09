import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { ContactoFabricaService } from './contacto-fabrica.service';

@Component({
    selector: 'jhi-contacto-fabrica-delete-dialog',
    templateUrl: './contacto-fabrica-delete-dialog.component.html'
})
export class ContactoFabricaDeleteDialogComponent {
    contactoFabrica: IContactoFabrica;

    constructor(
        protected contactoFabricaService: ContactoFabricaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactoFabricaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contactoFabricaListModification',
                content: 'Deleted an contactoFabrica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contacto-fabrica-delete-popup',
    template: ''
})
export class ContactoFabricaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactoFabrica }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactoFabricaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contactoFabrica = contactoFabrica;
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
