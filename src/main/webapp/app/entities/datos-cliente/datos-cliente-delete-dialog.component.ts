import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDatosCliente } from 'app/shared/model/datos-cliente.model';
import { DatosClienteService } from './datos-cliente.service';

@Component({
    selector: 'jhi-datos-cliente-delete-dialog',
    templateUrl: './datos-cliente-delete-dialog.component.html'
})
export class DatosClienteDeleteDialogComponent {
    datosCliente: IDatosCliente;

    constructor(
        protected datosClienteService: DatosClienteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.datosClienteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'datosClienteListModification',
                content: 'Deleted an datosCliente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-datos-cliente-delete-popup',
    template: ''
})
export class DatosClienteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ datosCliente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DatosClienteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.datosCliente = datosCliente;
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
