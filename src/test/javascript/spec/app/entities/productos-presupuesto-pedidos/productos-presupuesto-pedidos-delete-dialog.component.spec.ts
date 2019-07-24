/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosPresupuestoPedidosDeleteDialogComponent } from 'app/entities/productos-presupuesto-pedidos/productos-presupuesto-pedidos-delete-dialog.component';
import { ProductosPresupuestoPedidosService } from 'app/entities/productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';

describe('Component Tests', () => {
    describe('ProductosPresupuestoPedidos Management Delete Component', () => {
        let comp: ProductosPresupuestoPedidosDeleteDialogComponent;
        let fixture: ComponentFixture<ProductosPresupuestoPedidosDeleteDialogComponent>;
        let service: ProductosPresupuestoPedidosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosPresupuestoPedidosDeleteDialogComponent]
            })
                .overrideTemplate(ProductosPresupuestoPedidosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosPresupuestoPedidosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosPresupuestoPedidosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
