import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { ReferenciaClientesService } from './referencia-clientes.service';

@Component({
    selector: 'jhi-referencia-clientes-delete-dialog',
    templateUrl: './referencia-clientes-delete-dialog.component.html'
})
export class ReferenciaClientesDeleteDialogComponent {
    referenciaClientes: IReferenciaClientes;

    constructor(
        protected referenciaClientesService: ReferenciaClientesService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.referenciaClientesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'referenciaClientesListModification',
                content: 'Deleted an referenciaClientes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-referencia-clientes-delete-popup',
    template: ''
})
export class ReferenciaClientesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ referenciaClientes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReferenciaClientesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.referenciaClientes = referenciaClientes;
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
