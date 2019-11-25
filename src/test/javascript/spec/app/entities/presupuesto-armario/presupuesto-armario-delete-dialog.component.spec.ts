/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioDeleteDialogComponent } from 'app/entities/presupuesto-armario/presupuesto-armario-delete-dialog.component';
import { PresupuestoArmarioService } from 'app/entities/presupuesto-armario/presupuesto-armario.service';

describe('Component Tests', () => {
    describe('PresupuestoArmario Management Delete Component', () => {
        let comp: PresupuestoArmarioDeleteDialogComponent;
        let fixture: ComponentFixture<PresupuestoArmarioDeleteDialogComponent>;
        let service: PresupuestoArmarioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioDeleteDialogComponent]
            })
                .overrideTemplate(PresupuestoArmarioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoArmarioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoArmarioService);
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
