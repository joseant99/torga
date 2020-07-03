/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepreGCompraDeleteDialogComponent } from 'app/entities/repre-g-compra/repre-g-compra-delete-dialog.component';
import { RepreGCompraService } from 'app/entities/repre-g-compra/repre-g-compra.service';

describe('Component Tests', () => {
    describe('RepreGCompra Management Delete Component', () => {
        let comp: RepreGCompraDeleteDialogComponent;
        let fixture: ComponentFixture<RepreGCompraDeleteDialogComponent>;
        let service: RepreGCompraService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepreGCompraDeleteDialogComponent]
            })
                .overrideTemplate(RepreGCompraDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepreGCompraDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepreGCompraService);
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
