/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresArmariosDeleteDialogComponent } from 'app/entities/interiores-armarios/interiores-armarios-delete-dialog.component';
import { InterioresArmariosService } from 'app/entities/interiores-armarios/interiores-armarios.service';

describe('Component Tests', () => {
    describe('InterioresArmarios Management Delete Component', () => {
        let comp: InterioresArmariosDeleteDialogComponent;
        let fixture: ComponentFixture<InterioresArmariosDeleteDialogComponent>;
        let service: InterioresArmariosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresArmariosDeleteDialogComponent]
            })
                .overrideTemplate(InterioresArmariosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InterioresArmariosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterioresArmariosService);
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
