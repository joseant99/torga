/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PuertasPreciosDeleteDialogComponent } from 'app/entities/puertas-precios/puertas-precios-delete-dialog.component';
import { PuertasPreciosService } from 'app/entities/puertas-precios/puertas-precios.service';

describe('Component Tests', () => {
    describe('PuertasPrecios Management Delete Component', () => {
        let comp: PuertasPreciosDeleteDialogComponent;
        let fixture: ComponentFixture<PuertasPreciosDeleteDialogComponent>;
        let service: PuertasPreciosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PuertasPreciosDeleteDialogComponent]
            })
                .overrideTemplate(PuertasPreciosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PuertasPreciosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuertasPreciosService);
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
