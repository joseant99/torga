/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IvaProductoTiendaDeleteDialogComponent } from 'app/entities/iva-producto-tienda/iva-producto-tienda-delete-dialog.component';
import { IvaProductoTiendaService } from 'app/entities/iva-producto-tienda/iva-producto-tienda.service';

describe('Component Tests', () => {
    describe('IvaProductoTienda Management Delete Component', () => {
        let comp: IvaProductoTiendaDeleteDialogComponent;
        let fixture: ComponentFixture<IvaProductoTiendaDeleteDialogComponent>;
        let service: IvaProductoTiendaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IvaProductoTiendaDeleteDialogComponent]
            })
                .overrideTemplate(IvaProductoTiendaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IvaProductoTiendaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IvaProductoTiendaService);
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
