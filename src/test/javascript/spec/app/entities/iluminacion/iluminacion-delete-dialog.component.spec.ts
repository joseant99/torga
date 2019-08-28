/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IluminacionDeleteDialogComponent } from 'app/entities/iluminacion/iluminacion-delete-dialog.component';
import { IluminacionService } from 'app/entities/iluminacion/iluminacion.service';

describe('Component Tests', () => {
    describe('Iluminacion Management Delete Component', () => {
        let comp: IluminacionDeleteDialogComponent;
        let fixture: ComponentFixture<IluminacionDeleteDialogComponent>;
        let service: IluminacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IluminacionDeleteDialogComponent]
            })
                .overrideTemplate(IluminacionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IluminacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IluminacionService);
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
