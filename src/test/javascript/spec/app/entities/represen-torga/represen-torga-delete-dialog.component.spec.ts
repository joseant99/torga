/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresenTorgaDeleteDialogComponent } from 'app/entities/represen-torga/represen-torga-delete-dialog.component';
import { RepresenTorgaService } from 'app/entities/represen-torga/represen-torga.service';

describe('Component Tests', () => {
    describe('RepresenTorga Management Delete Component', () => {
        let comp: RepresenTorgaDeleteDialogComponent;
        let fixture: ComponentFixture<RepresenTorgaDeleteDialogComponent>;
        let service: RepresenTorgaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresenTorgaDeleteDialogComponent]
            })
                .overrideTemplate(RepresenTorgaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepresenTorgaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepresenTorgaService);
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
