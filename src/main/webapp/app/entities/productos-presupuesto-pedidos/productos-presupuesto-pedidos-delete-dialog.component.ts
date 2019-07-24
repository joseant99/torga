import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ProductosPresupuestoPedidosService } from './productos-presupuesto-pedidos.service';

@Component({
    selector: 'jhi-productos-presupuesto-pedidos-delete-dialog',
    templateUrl: './productos-presupuesto-pedidos-delete-dialog.component.html'
})
export class ProductosPresupuestoPedidosDeleteDialogComponent {
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;

    constructor(
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productosPresupuestoPedidosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productosPresupuestoPedidosListModification',
                content: 'Deleted an productosPresupuestoPedidos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-productos-presupuesto-pedidos-delete-popup',
    template: ''
})
export class ProductosPresupuestoPedidosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosPresupuestoPedidos }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductosPresupuestoPedidosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productosPresupuestoPedidos = productosPresupuestoPedidos;
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
