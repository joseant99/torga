/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CajeadoDeleteDialogComponent } from 'app/entities/cajeado/cajeado-delete-dialog.component';
import { CajeadoService } from 'app/entities/cajeado/cajeado.service';

describe('Component Tests', () => {
    describe('Cajeado Management Delete Component', () => {
        let comp: CajeadoDeleteDialogComponent;
        let fixture: ComponentFixture<CajeadoDeleteDialogComponent>;
        let service: CajeadoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CajeadoDeleteDialogComponent]
            })
                .overrideTemplate(CajeadoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CajeadoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CajeadoService);
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
