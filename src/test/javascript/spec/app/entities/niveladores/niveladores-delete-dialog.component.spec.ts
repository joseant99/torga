/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { NiveladoresDeleteDialogComponent } from 'app/entities/niveladores/niveladores-delete-dialog.component';
import { NiveladoresService } from 'app/entities/niveladores/niveladores.service';

describe('Component Tests', () => {
    describe('Niveladores Management Delete Component', () => {
        let comp: NiveladoresDeleteDialogComponent;
        let fixture: ComponentFixture<NiveladoresDeleteDialogComponent>;
        let service: NiveladoresService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [NiveladoresDeleteDialogComponent]
            })
                .overrideTemplate(NiveladoresDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NiveladoresDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveladoresService);
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
