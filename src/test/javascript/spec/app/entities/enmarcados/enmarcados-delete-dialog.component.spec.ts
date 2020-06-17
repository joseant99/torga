/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { EnmarcadosDeleteDialogComponent } from 'app/entities/enmarcados/enmarcados-delete-dialog.component';
import { EnmarcadosService } from 'app/entities/enmarcados/enmarcados.service';

describe('Component Tests', () => {
    describe('Enmarcados Management Delete Component', () => {
        let comp: EnmarcadosDeleteDialogComponent;
        let fixture: ComponentFixture<EnmarcadosDeleteDialogComponent>;
        let service: EnmarcadosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [EnmarcadosDeleteDialogComponent]
            })
                .overrideTemplate(EnmarcadosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnmarcadosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnmarcadosService);
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
