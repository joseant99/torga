/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PagosTorgaTiendasUpdateComponent } from 'app/entities/pagos-torga-tiendas/pagos-torga-tiendas-update.component';
import { PagosTorgaTiendasService } from 'app/entities/pagos-torga-tiendas/pagos-torga-tiendas.service';
import { PagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';

describe('Component Tests', () => {
    describe('PagosTorgaTiendas Management Update Component', () => {
        let comp: PagosTorgaTiendasUpdateComponent;
        let fixture: ComponentFixture<PagosTorgaTiendasUpdateComponent>;
        let service: PagosTorgaTiendasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PagosTorgaTiendasUpdateComponent]
            })
                .overrideTemplate(PagosTorgaTiendasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PagosTorgaTiendasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosTorgaTiendasService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PagosTorgaTiendas(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pagosTorgaTiendas = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PagosTorgaTiendas();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pagosTorgaTiendas = entity;
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
