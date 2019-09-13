/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ImagenesContactoFabricaDeleteDialogComponent } from 'app/entities/imagenes-contacto-fabrica/imagenes-contacto-fabrica-delete-dialog.component';
import { ImagenesContactoFabricaService } from 'app/entities/imagenes-contacto-fabrica/imagenes-contacto-fabrica.service';

describe('Component Tests', () => {
    describe('ImagenesContactoFabrica Management Delete Component', () => {
        let comp: ImagenesContactoFabricaDeleteDialogComponent;
        let fixture: ComponentFixture<ImagenesContactoFabricaDeleteDialogComponent>;
        let service: ImagenesContactoFabricaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ImagenesContactoFabricaDeleteDialogComponent]
            })
                .overrideTemplate(ImagenesContactoFabricaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImagenesContactoFabricaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagenesContactoFabricaService);
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
