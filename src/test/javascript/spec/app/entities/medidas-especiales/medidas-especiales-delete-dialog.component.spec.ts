/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MedidasEspecialesDeleteDialogComponent } from 'app/entities/medidas-especiales/medidas-especiales-delete-dialog.component';
import { MedidasEspecialesService } from 'app/entities/medidas-especiales/medidas-especiales.service';

describe('Component Tests', () => {
    describe('MedidasEspeciales Management Delete Component', () => {
        let comp: MedidasEspecialesDeleteDialogComponent;
        let fixture: ComponentFixture<MedidasEspecialesDeleteDialogComponent>;
        let service: MedidasEspecialesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MedidasEspecialesDeleteDialogComponent]
            })
                .overrideTemplate(MedidasEspecialesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedidasEspecialesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedidasEspecialesService);
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
