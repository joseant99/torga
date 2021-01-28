/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Fecha_entregaDeleteDialogComponent } from 'app/entities/fecha-entrega/fecha-entrega-delete-dialog.component';
import { Fecha_entregaService } from 'app/entities/fecha-entrega/fecha-entrega.service';

describe('Component Tests', () => {
    describe('Fecha_entrega Management Delete Component', () => {
        let comp: Fecha_entregaDeleteDialogComponent;
        let fixture: ComponentFixture<Fecha_entregaDeleteDialogComponent>;
        let service: Fecha_entregaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Fecha_entregaDeleteDialogComponent]
            })
                .overrideTemplate(Fecha_entregaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Fecha_entregaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Fecha_entregaService);
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
