/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosProductosPresupuestoPedidoDeleteDialogComponent } from 'app/entities/acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido-delete-dialog.component';
import { AcabadosProductosPresupuestoPedidoService } from 'app/entities/acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';

describe('Component Tests', () => {
    describe('AcabadosProductosPresupuestoPedido Management Delete Component', () => {
        let comp: AcabadosProductosPresupuestoPedidoDeleteDialogComponent;
        let fixture: ComponentFixture<AcabadosProductosPresupuestoPedidoDeleteDialogComponent>;
        let service: AcabadosProductosPresupuestoPedidoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosProductosPresupuestoPedidoDeleteDialogComponent]
            })
                .overrideTemplate(AcabadosProductosPresupuestoPedidoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcabadosProductosPresupuestoPedidoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcabadosProductosPresupuestoPedidoService);
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
