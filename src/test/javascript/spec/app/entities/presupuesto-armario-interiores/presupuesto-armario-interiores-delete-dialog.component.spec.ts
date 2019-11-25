/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioInterioresDeleteDialogComponent } from 'app/entities/presupuesto-armario-interiores/presupuesto-armario-interiores-delete-dialog.component';
import { PresupuestoArmarioInterioresService } from 'app/entities/presupuesto-armario-interiores/presupuesto-armario-interiores.service';

describe('Component Tests', () => {
    describe('PresupuestoArmarioInteriores Management Delete Component', () => {
        let comp: PresupuestoArmarioInterioresDeleteDialogComponent;
        let fixture: ComponentFixture<PresupuestoArmarioInterioresDeleteDialogComponent>;
        let service: PresupuestoArmarioInterioresService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioInterioresDeleteDialogComponent]
            })
                .overrideTemplate(PresupuestoArmarioInterioresDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoArmarioInterioresDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoArmarioInterioresService);
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
