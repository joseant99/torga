/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CategoriasDormiDeleteDialogComponent } from 'app/entities/categorias-dormi/categorias-dormi-delete-dialog.component';
import { CategoriasDormiService } from 'app/entities/categorias-dormi/categorias-dormi.service';

describe('Component Tests', () => {
    describe('CategoriasDormi Management Delete Component', () => {
        let comp: CategoriasDormiDeleteDialogComponent;
        let fixture: ComponentFixture<CategoriasDormiDeleteDialogComponent>;
        let service: CategoriasDormiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CategoriasDormiDeleteDialogComponent]
            })
                .overrideTemplate(CategoriasDormiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriasDormiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriasDormiService);
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
