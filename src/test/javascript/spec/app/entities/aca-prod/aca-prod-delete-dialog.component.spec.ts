/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcaProdDeleteDialogComponent } from 'app/entities/aca-prod/aca-prod-delete-dialog.component';
import { AcaProdService } from 'app/entities/aca-prod/aca-prod.service';

describe('Component Tests', () => {
    describe('AcaProd Management Delete Component', () => {
        let comp: AcaProdDeleteDialogComponent;
        let fixture: ComponentFixture<AcaProdDeleteDialogComponent>;
        let service: AcaProdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcaProdDeleteDialogComponent]
            })
                .overrideTemplate(AcaProdDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcaProdDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcaProdService);
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
