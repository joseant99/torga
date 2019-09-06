/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PagosTorgaTiendasDeleteDialogComponent } from 'app/entities/pagos-torga-tiendas/pagos-torga-tiendas-delete-dialog.component';
import { PagosTorgaTiendasService } from 'app/entities/pagos-torga-tiendas/pagos-torga-tiendas.service';

describe('Component Tests', () => {
    describe('PagosTorgaTiendas Management Delete Component', () => {
        let comp: PagosTorgaTiendasDeleteDialogComponent;
        let fixture: ComponentFixture<PagosTorgaTiendasDeleteDialogComponent>;
        let service: PagosTorgaTiendasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PagosTorgaTiendasDeleteDialogComponent]
            })
                .overrideTemplate(PagosTorgaTiendasDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PagosTorgaTiendasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosTorgaTiendasService);
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
