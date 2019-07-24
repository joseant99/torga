/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ReferenciaClientesDeleteDialogComponent } from 'app/entities/referencia-clientes/referencia-clientes-delete-dialog.component';
import { ReferenciaClientesService } from 'app/entities/referencia-clientes/referencia-clientes.service';

describe('Component Tests', () => {
    describe('ReferenciaClientes Management Delete Component', () => {
        let comp: ReferenciaClientesDeleteDialogComponent;
        let fixture: ComponentFixture<ReferenciaClientesDeleteDialogComponent>;
        let service: ReferenciaClientesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ReferenciaClientesDeleteDialogComponent]
            })
                .overrideTemplate(ReferenciaClientesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReferenciaClientesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenciaClientesService);
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
