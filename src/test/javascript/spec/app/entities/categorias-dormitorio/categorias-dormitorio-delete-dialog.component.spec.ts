/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Categorias_DormitorioDeleteDialogComponent } from 'app/entities/categorias-dormitorio/categorias-dormitorio-delete-dialog.component';
import { Categorias_DormitorioService } from 'app/entities/categorias-dormitorio/categorias-dormitorio.service';

describe('Component Tests', () => {
    describe('Categorias_Dormitorio Management Delete Component', () => {
        let comp: Categorias_DormitorioDeleteDialogComponent;
        let fixture: ComponentFixture<Categorias_DormitorioDeleteDialogComponent>;
        let service: Categorias_DormitorioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Categorias_DormitorioDeleteDialogComponent]
            })
                .overrideTemplate(Categorias_DormitorioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Categorias_DormitorioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Categorias_DormitorioService);
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
