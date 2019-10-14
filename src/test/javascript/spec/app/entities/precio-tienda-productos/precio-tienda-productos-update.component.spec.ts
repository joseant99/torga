/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioTiendaProductosUpdateComponent } from 'app/entities/precio-tienda-productos/precio-tienda-productos-update.component';
import { PrecioTiendaProductosService } from 'app/entities/precio-tienda-productos/precio-tienda-productos.service';
import { PrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';

describe('Component Tests', () => {
    describe('PrecioTiendaProductos Management Update Component', () => {
        let comp: PrecioTiendaProductosUpdateComponent;
        let fixture: ComponentFixture<PrecioTiendaProductosUpdateComponent>;
        let service: PrecioTiendaProductosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioTiendaProductosUpdateComponent]
            })
                .overrideTemplate(PrecioTiendaProductosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrecioTiendaProductosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioTiendaProductosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PrecioTiendaProductos(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.precioTiendaProductos = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PrecioTiendaProductos();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.precioTiendaProductos = entity;
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
