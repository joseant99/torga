/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DimensionesProductoUpdateComponent } from 'app/entities/dimensiones-producto/dimensiones-producto-update.component';
import { DimensionesProductoService } from 'app/entities/dimensiones-producto/dimensiones-producto.service';
import { DimensionesProducto } from 'app/shared/model/dimensiones-producto.model';

describe('Component Tests', () => {
    describe('DimensionesProducto Management Update Component', () => {
        let comp: DimensionesProductoUpdateComponent;
        let fixture: ComponentFixture<DimensionesProductoUpdateComponent>;
        let service: DimensionesProductoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DimensionesProductoUpdateComponent]
            })
                .overrideTemplate(DimensionesProductoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DimensionesProductoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DimensionesProductoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DimensionesProducto(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dimensionesProducto = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DimensionesProducto();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dimensionesProducto = entity;
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
