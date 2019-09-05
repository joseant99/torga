/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresentanteTiendaDeleteDialogComponent } from 'app/entities/representante-tienda/representante-tienda-delete-dialog.component';
import { RepresentanteTiendaService } from 'app/entities/representante-tienda/representante-tienda.service';

describe('Component Tests', () => {
    describe('RepresentanteTienda Management Delete Component', () => {
        let comp: RepresentanteTiendaDeleteDialogComponent;
        let fixture: ComponentFixture<RepresentanteTiendaDeleteDialogComponent>;
        let service: RepresentanteTiendaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresentanteTiendaDeleteDialogComponent]
            })
                .overrideTemplate(RepresentanteTiendaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepresentanteTiendaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepresentanteTiendaService);
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
