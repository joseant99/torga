/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosDormitorioDeleteDialogComponent } from 'app/entities/productos-dormitorio/productos-dormitorio-delete-dialog.component';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio/productos-dormitorio.service';

describe('Component Tests', () => {
    describe('ProductosDormitorio Management Delete Component', () => {
        let comp: ProductosDormitorioDeleteDialogComponent;
        let fixture: ComponentFixture<ProductosDormitorioDeleteDialogComponent>;
        let service: ProductosDormitorioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosDormitorioDeleteDialogComponent]
            })
                .overrideTemplate(ProductosDormitorioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosDormitorioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosDormitorioService);
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
