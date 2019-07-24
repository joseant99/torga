/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosComposicionDeleteDialogComponent } from 'app/entities/productos-composicion/productos-composicion-delete-dialog.component';
import { ProductosComposicionService } from 'app/entities/productos-composicion/productos-composicion.service';

describe('Component Tests', () => {
    describe('ProductosComposicion Management Delete Component', () => {
        let comp: ProductosComposicionDeleteDialogComponent;
        let fixture: ComponentFixture<ProductosComposicionDeleteDialogComponent>;
        let service: ProductosComposicionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosComposicionDeleteDialogComponent]
            })
                .overrideTemplate(ProductosComposicionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosComposicionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosComposicionService);
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
