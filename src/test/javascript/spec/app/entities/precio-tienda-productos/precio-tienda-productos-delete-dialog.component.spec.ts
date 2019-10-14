/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioTiendaProductosDeleteDialogComponent } from 'app/entities/precio-tienda-productos/precio-tienda-productos-delete-dialog.component';
import { PrecioTiendaProductosService } from 'app/entities/precio-tienda-productos/precio-tienda-productos.service';

describe('Component Tests', () => {
    describe('PrecioTiendaProductos Management Delete Component', () => {
        let comp: PrecioTiendaProductosDeleteDialogComponent;
        let fixture: ComponentFixture<PrecioTiendaProductosDeleteDialogComponent>;
        let service: PrecioTiendaProductosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioTiendaProductosDeleteDialogComponent]
            })
                .overrideTemplate(PrecioTiendaProductosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrecioTiendaProductosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioTiendaProductosService);
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
