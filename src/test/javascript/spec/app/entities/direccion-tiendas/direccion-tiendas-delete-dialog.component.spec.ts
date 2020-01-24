/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DireccionTiendasDeleteDialogComponent } from 'app/entities/direccion-tiendas/direccion-tiendas-delete-dialog.component';
import { DireccionTiendasService } from 'app/entities/direccion-tiendas/direccion-tiendas.service';

describe('Component Tests', () => {
    describe('DireccionTiendas Management Delete Component', () => {
        let comp: DireccionTiendasDeleteDialogComponent;
        let fixture: ComponentFixture<DireccionTiendasDeleteDialogComponent>;
        let service: DireccionTiendasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DireccionTiendasDeleteDialogComponent]
            })
                .overrideTemplate(DireccionTiendasDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DireccionTiendasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DireccionTiendasService);
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
