/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MunicipiosDeleteDialogComponent } from 'app/entities/municipios/municipios-delete-dialog.component';
import { MunicipiosService } from 'app/entities/municipios/municipios.service';

describe('Component Tests', () => {
    describe('Municipios Management Delete Component', () => {
        let comp: MunicipiosDeleteDialogComponent;
        let fixture: ComponentFixture<MunicipiosDeleteDialogComponent>;
        let service: MunicipiosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MunicipiosDeleteDialogComponent]
            })
                .overrideTemplate(MunicipiosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MunicipiosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MunicipiosService);
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
