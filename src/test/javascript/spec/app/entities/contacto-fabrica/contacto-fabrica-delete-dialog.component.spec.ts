/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ContactoFabricaDeleteDialogComponent } from 'app/entities/contacto-fabrica/contacto-fabrica-delete-dialog.component';
import { ContactoFabricaService } from 'app/entities/contacto-fabrica/contacto-fabrica.service';

describe('Component Tests', () => {
    describe('ContactoFabrica Management Delete Component', () => {
        let comp: ContactoFabricaDeleteDialogComponent;
        let fixture: ComponentFixture<ContactoFabricaDeleteDialogComponent>;
        let service: ContactoFabricaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ContactoFabricaDeleteDialogComponent]
            })
                .overrideTemplate(ContactoFabricaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactoFabricaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactoFabricaService);
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
