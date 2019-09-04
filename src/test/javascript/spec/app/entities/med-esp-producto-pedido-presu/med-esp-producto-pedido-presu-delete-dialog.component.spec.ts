/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MedEspProductoPedidoPresuDeleteDialogComponent } from 'app/entities/med-esp-producto-pedido-presu/med-esp-producto-pedido-presu-delete-dialog.component';
import { MedEspProductoPedidoPresuService } from 'app/entities/med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';

describe('Component Tests', () => {
    describe('MedEspProductoPedidoPresu Management Delete Component', () => {
        let comp: MedEspProductoPedidoPresuDeleteDialogComponent;
        let fixture: ComponentFixture<MedEspProductoPedidoPresuDeleteDialogComponent>;
        let service: MedEspProductoPedidoPresuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MedEspProductoPedidoPresuDeleteDialogComponent]
            })
                .overrideTemplate(MedEspProductoPedidoPresuDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedEspProductoPedidoPresuDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedEspProductoPedidoPresuService);
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
