/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DimensionesProductoTipoDeleteDialogComponent } from 'app/entities/dimensiones-producto-tipo/dimensiones-producto-tipo-delete-dialog.component';
import { DimensionesProductoTipoService } from 'app/entities/dimensiones-producto-tipo/dimensiones-producto-tipo.service';

describe('Component Tests', () => {
    describe('DimensionesProductoTipo Management Delete Component', () => {
        let comp: DimensionesProductoTipoDeleteDialogComponent;
        let fixture: ComponentFixture<DimensionesProductoTipoDeleteDialogComponent>;
        let service: DimensionesProductoTipoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DimensionesProductoTipoDeleteDialogComponent]
            })
                .overrideTemplate(DimensionesProductoTipoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DimensionesProductoTipoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DimensionesProductoTipoService);
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
