/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosComposicionDeleteDialogComponent } from 'app/entities/acabados-composicion/acabados-composicion-delete-dialog.component';
import { AcabadosComposicionService } from 'app/entities/acabados-composicion/acabados-composicion.service';

describe('Component Tests', () => {
    describe('AcabadosComposicion Management Delete Component', () => {
        let comp: AcabadosComposicionDeleteDialogComponent;
        let fixture: ComponentFixture<AcabadosComposicionDeleteDialogComponent>;
        let service: AcabadosComposicionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosComposicionDeleteDialogComponent]
            })
                .overrideTemplate(AcabadosComposicionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcabadosComposicionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcabadosComposicionService);
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
