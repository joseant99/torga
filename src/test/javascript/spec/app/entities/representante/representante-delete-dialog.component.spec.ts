/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresentanteDeleteDialogComponent } from 'app/entities/representante/representante-delete-dialog.component';
import { RepresentanteService } from 'app/entities/representante/representante.service';

describe('Component Tests', () => {
    describe('Representante Management Delete Component', () => {
        let comp: RepresentanteDeleteDialogComponent;
        let fixture: ComponentFixture<RepresentanteDeleteDialogComponent>;
        let service: RepresentanteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresentanteDeleteDialogComponent]
            })
                .overrideTemplate(RepresentanteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepresentanteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepresentanteService);
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
