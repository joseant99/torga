/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ImagenDeCestaProdDeleteDialogComponent } from 'app/entities/imagen-de-cesta-prod/imagen-de-cesta-prod-delete-dialog.component';
import { ImagenDeCestaProdService } from 'app/entities/imagen-de-cesta-prod/imagen-de-cesta-prod.service';

describe('Component Tests', () => {
    describe('ImagenDeCestaProd Management Delete Component', () => {
        let comp: ImagenDeCestaProdDeleteDialogComponent;
        let fixture: ComponentFixture<ImagenDeCestaProdDeleteDialogComponent>;
        let service: ImagenDeCestaProdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ImagenDeCestaProdDeleteDialogComponent]
            })
                .overrideTemplate(ImagenDeCestaProdDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImagenDeCestaProdDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagenDeCestaProdService);
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
