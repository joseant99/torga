/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Acabados_ProductosDeleteDialogComponent } from 'app/entities/acabados-productos/acabados-productos-delete-dialog.component';
import { Acabados_ProductosService } from 'app/entities/acabados-productos/acabados-productos.service';

describe('Component Tests', () => {
    describe('Acabados_Productos Management Delete Component', () => {
        let comp: Acabados_ProductosDeleteDialogComponent;
        let fixture: ComponentFixture<Acabados_ProductosDeleteDialogComponent>;
        let service: Acabados_ProductosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Acabados_ProductosDeleteDialogComponent]
            })
                .overrideTemplate(Acabados_ProductosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Acabados_ProductosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acabados_ProductosService);
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
