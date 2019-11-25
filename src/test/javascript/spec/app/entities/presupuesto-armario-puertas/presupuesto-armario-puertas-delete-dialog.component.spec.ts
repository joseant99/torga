/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioPuertasDeleteDialogComponent } from 'app/entities/presupuesto-armario-puertas/presupuesto-armario-puertas-delete-dialog.component';
import { PresupuestoArmarioPuertasService } from 'app/entities/presupuesto-armario-puertas/presupuesto-armario-puertas.service';

describe('Component Tests', () => {
    describe('PresupuestoArmarioPuertas Management Delete Component', () => {
        let comp: PresupuestoArmarioPuertasDeleteDialogComponent;
        let fixture: ComponentFixture<PresupuestoArmarioPuertasDeleteDialogComponent>;
        let service: PresupuestoArmarioPuertasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioPuertasDeleteDialogComponent]
            })
                .overrideTemplate(PresupuestoArmarioPuertasDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoArmarioPuertasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoArmarioPuertasService);
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
