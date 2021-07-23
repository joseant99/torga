/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InteriorArmarioMedidaDeleteDialogComponent } from 'app/entities/interior-armario-medida/interior-armario-medida-delete-dialog.component';
import { InteriorArmarioMedidaService } from 'app/entities/interior-armario-medida/interior-armario-medida.service';

describe('Component Tests', () => {
    describe('InteriorArmarioMedida Management Delete Component', () => {
        let comp: InteriorArmarioMedidaDeleteDialogComponent;
        let fixture: ComponentFixture<InteriorArmarioMedidaDeleteDialogComponent>;
        let service: InteriorArmarioMedidaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InteriorArmarioMedidaDeleteDialogComponent]
            })
                .overrideTemplate(InteriorArmarioMedidaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InteriorArmarioMedidaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteriorArmarioMedidaService);
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
