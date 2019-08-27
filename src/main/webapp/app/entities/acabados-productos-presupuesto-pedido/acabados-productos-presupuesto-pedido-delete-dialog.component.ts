import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { AcabadosProductosPresupuestoPedidoService } from './acabados-productos-presupuesto-pedido.service';

@Component({
    selector: 'jhi-acabados-productos-presupuesto-pedido-delete-dialog',
    templateUrl: './acabados-productos-presupuesto-pedido-delete-dialog.component.html'
})
export class AcabadosProductosPresupuestoPedidoDeleteDialogComponent {
    acabadosProductosPresupuestoPedido: IAcabadosProductosPresupuestoPedido;

    constructor(
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acabadosProductosPresupuestoPedidoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acabadosProductosPresupuestoPedidoListModification',
                content: 'Deleted an acabadosProductosPresupuestoPedido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acabados-productos-presupuesto-pedido-delete-popup',
    template: ''
})
export class AcabadosProductosPresupuestoPedidoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabadosProductosPresupuestoPedido }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AcabadosProductosPresupuestoPedidoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.acabadosProductosPresupuestoPedido = acabadosProductosPresupuestoPedido;
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
