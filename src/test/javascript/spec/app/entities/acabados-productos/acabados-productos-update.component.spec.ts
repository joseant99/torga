/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Acabados_ProductosUpdateComponent } from 'app/entities/acabados-productos/acabados-productos-update.component';
import { Acabados_ProductosService } from 'app/entities/acabados-productos/acabados-productos.service';
import { Acabados_Productos } from 'app/shared/model/acabados-productos.model';

describe('Component Tests', () => {
    describe('Acabados_Productos Management Update Component', () => {
        let comp: Acabados_ProductosUpdateComponent;
        let fixture: ComponentFixture<Acabados_ProductosUpdateComponent>;
        let service: Acabados_ProductosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Acabados_ProductosUpdateComponent]
            })
                .overrideTemplate(Acabados_ProductosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Acabados_ProductosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Acabados_ProductosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Acabados_Productos(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabados_Productos = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Acabados_Productos();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabados_Productos = entity;
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
