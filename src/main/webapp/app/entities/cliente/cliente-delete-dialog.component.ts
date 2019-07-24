import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { ReferenciaClientesService } from '../referencia-clientes/referencia-clientes.service';
@Component({
    selector: 'jhi-cliente-delete-dialog',
    templateUrl: './cliente-delete-dialog.component.html'
})
export class ClienteDeleteDialogComponent {
    cliente: ICliente;
    referenciaClientes: IReferenciaClientes[];

    constructor(
        protected clienteService: ClienteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        protected referenciaClientesService: ReferenciaClientesService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        //CON EL ID DEL CLIENTE BUSCAMOS LAS DIFERENTES REFERENCIAS QUE TIENE
        this.clienteService.findRef(id).subscribe((res: HttpResponse<IReferenciaClientes[]>) => {
            this.referenciaClientes = res.body;
            //SUELE TENER MAS DE UNA REFERENCIA POR ESO SE NECESITA EL FOR
            for (let ref of this.referenciaClientes) {
                this.referenciaClientesService.delete(ref.id).subscribe(response => {
                    this.eventManager.broadcast({
                        name: 'referenciaClientesListModification',
                        content: 'Deleted an referenciaClientes'
                    });
                    this.activeModal.dismiss(true);
                });
            }
            this.clienteService.delete(id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'clienteListModification',
                    content: 'Deleted an cliente'
                });
                this.activeModal.dismiss(true);
            });
        });
    }
}

@Component({
    selector: 'jhi-cliente-delete-popup',
    template: ''
})
export class ClienteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cliente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClienteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cliente = cliente;
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
