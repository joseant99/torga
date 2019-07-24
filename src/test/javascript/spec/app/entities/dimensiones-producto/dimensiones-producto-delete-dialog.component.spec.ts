/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DimensionesProductoDeleteDialogComponent } from 'app/entities/dimensiones-producto/dimensiones-producto-delete-dialog.component';
import { DimensionesProductoService } from 'app/entities/dimensiones-producto/dimensiones-producto.service';

describe('Component Tests', () => {
    describe('DimensionesProducto Management Delete Component', () => {
        let comp: DimensionesProductoDeleteDialogComponent;
        let fixture: ComponentFixture<DimensionesProductoDeleteDialogComponent>;
        let service: DimensionesProductoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DimensionesProductoDeleteDialogComponent]
            })
                .overrideTemplate(DimensionesProductoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DimensionesProductoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DimensionesProductoService);
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
