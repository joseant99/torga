/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InteriorArmarioDentroDeleteDialogComponent } from 'app/entities/interior-armario-dentro/interior-armario-dentro-delete-dialog.component';
import { InteriorArmarioDentroService } from 'app/entities/interior-armario-dentro/interior-armario-dentro.service';

describe('Component Tests', () => {
    describe('InteriorArmarioDentro Management Delete Component', () => {
        let comp: InteriorArmarioDentroDeleteDialogComponent;
        let fixture: ComponentFixture<InteriorArmarioDentroDeleteDialogComponent>;
        let service: InteriorArmarioDentroService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InteriorArmarioDentroDeleteDialogComponent]
            })
                .overrideTemplate(InteriorArmarioDentroDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InteriorArmarioDentroDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteriorArmarioDentroService);
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
