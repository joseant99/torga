/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { FPagoUpdateComponent } from 'app/entities/f-pago/f-pago-update.component';
import { FPagoService } from 'app/entities/f-pago/f-pago.service';
import { FPago } from 'app/shared/model/f-pago.model';

describe('Component Tests', () => {
    describe('FPago Management Update Component', () => {
        let comp: FPagoUpdateComponent;
        let fixture: ComponentFixture<FPagoUpdateComponent>;
        let service: FPagoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [FPagoUpdateComponent]
            })
                .overrideTemplate(FPagoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FPagoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FPagoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FPago(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.fPago = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FPago();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.fPago = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
