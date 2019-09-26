/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioTiendaDeleteDialogComponent } from 'app/entities/precio-tienda/precio-tienda-delete-dialog.component';
import { PrecioTiendaService } from 'app/entities/precio-tienda/precio-tienda.service';

describe('Component Tests', () => {
    describe('PrecioTienda Management Delete Component', () => {
        let comp: PrecioTiendaDeleteDialogComponent;
        let fixture: ComponentFixture<PrecioTiendaDeleteDialogComponent>;
        let service: PrecioTiendaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioTiendaDeleteDialogComponent]
            })
                .overrideTemplate(PrecioTiendaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrecioTiendaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioTiendaService);
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
