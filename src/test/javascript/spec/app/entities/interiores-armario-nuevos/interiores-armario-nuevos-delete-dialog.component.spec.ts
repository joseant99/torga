/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresArmarioNuevosDeleteDialogComponent } from 'app/entities/interiores-armario-nuevos/interiores-armario-nuevos-delete-dialog.component';
import { InterioresArmarioNuevosService } from 'app/entities/interiores-armario-nuevos/interiores-armario-nuevos.service';

describe('Component Tests', () => {
    describe('InterioresArmarioNuevos Management Delete Component', () => {
        let comp: InterioresArmarioNuevosDeleteDialogComponent;
        let fixture: ComponentFixture<InterioresArmarioNuevosDeleteDialogComponent>;
        let service: InterioresArmarioNuevosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresArmarioNuevosDeleteDialogComponent]
            })
                .overrideTemplate(InterioresArmarioNuevosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InterioresArmarioNuevosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterioresArmarioNuevosService);
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
