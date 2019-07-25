/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProvinciasDeleteDialogComponent } from 'app/entities/provincias/provincias-delete-dialog.component';
import { ProvinciasService } from 'app/entities/provincias/provincias.service';

describe('Component Tests', () => {
    describe('Provincias Management Delete Component', () => {
        let comp: ProvinciasDeleteDialogComponent;
        let fixture: ComponentFixture<ProvinciasDeleteDialogComponent>;
        let service: ProvinciasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProvinciasDeleteDialogComponent]
            })
                .overrideTemplate(ProvinciasDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProvinciasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinciasService);
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
