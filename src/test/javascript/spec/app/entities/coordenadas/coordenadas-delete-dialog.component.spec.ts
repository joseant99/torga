/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CoordenadasDeleteDialogComponent } from 'app/entities/coordenadas/coordenadas-delete-dialog.component';
import { CoordenadasService } from 'app/entities/coordenadas/coordenadas.service';

describe('Component Tests', () => {
    describe('Coordenadas Management Delete Component', () => {
        let comp: CoordenadasDeleteDialogComponent;
        let fixture: ComponentFixture<CoordenadasDeleteDialogComponent>;
        let service: CoordenadasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CoordenadasDeleteDialogComponent]
            })
                .overrideTemplate(CoordenadasDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CoordenadasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoordenadasService);
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
