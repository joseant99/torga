/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TiradoresArmarioDeleteDialogComponent } from 'app/entities/tiradores-armario/tiradores-armario-delete-dialog.component';
import { TiradoresArmarioService } from 'app/entities/tiradores-armario/tiradores-armario.service';

describe('Component Tests', () => {
    describe('TiradoresArmario Management Delete Component', () => {
        let comp: TiradoresArmarioDeleteDialogComponent;
        let fixture: ComponentFixture<TiradoresArmarioDeleteDialogComponent>;
        let service: TiradoresArmarioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TiradoresArmarioDeleteDialogComponent]
            })
                .overrideTemplate(TiradoresArmarioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TiradoresArmarioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TiradoresArmarioService);
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
