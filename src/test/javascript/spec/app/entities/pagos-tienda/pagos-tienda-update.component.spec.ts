/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PagosTiendaUpdateComponent } from 'app/entities/pagos-tienda/pagos-tienda-update.component';
import { PagosTiendaService } from 'app/entities/pagos-tienda/pagos-tienda.service';
import { PagosTienda } from 'app/shared/model/pagos-tienda.model';

describe('Component Tests', () => {
    describe('PagosTienda Management Update Component', () => {
        let comp: PagosTiendaUpdateComponent;
        let fixture: ComponentFixture<PagosTiendaUpdateComponent>;
        let service: PagosTiendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PagosTiendaUpdateComponent]
            })
                .overrideTemplate(PagosTiendaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PagosTiendaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosTiendaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PagosTienda(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pagosTienda = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PagosTienda();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pagosTienda = entity;
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
