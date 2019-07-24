/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoPedidoDeleteDialogComponent } from 'app/entities/presupuesto-pedido/presupuesto-pedido-delete-dialog.component';
import { PresupuestoPedidoService } from 'app/entities/presupuesto-pedido/presupuesto-pedido.service';

describe('Component Tests', () => {
    describe('PresupuestoPedido Management Delete Component', () => {
        let comp: PresupuestoPedidoDeleteDialogComponent;
        let fixture: ComponentFixture<PresupuestoPedidoDeleteDialogComponent>;
        let service: PresupuestoPedidoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoPedidoDeleteDialogComponent]
            })
                .overrideTemplate(PresupuestoPedidoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoPedidoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoPedidoService);
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
