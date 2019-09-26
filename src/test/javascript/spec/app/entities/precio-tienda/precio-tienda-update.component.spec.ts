/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioTiendaUpdateComponent } from 'app/entities/precio-tienda/precio-tienda-update.component';
import { PrecioTiendaService } from 'app/entities/precio-tienda/precio-tienda.service';
import { PrecioTienda } from 'app/shared/model/precio-tienda.model';

describe('Component Tests', () => {
    describe('PrecioTienda Management Update Component', () => {
        let comp: PrecioTiendaUpdateComponent;
        let fixture: ComponentFixture<PrecioTiendaUpdateComponent>;
        let service: PrecioTiendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioTiendaUpdateComponent]
            })
                .overrideTemplate(PrecioTiendaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrecioTiendaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioTiendaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PrecioTienda(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.precioTienda = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PrecioTienda();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.precioTienda = entity;
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
