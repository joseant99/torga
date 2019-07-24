/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosDormitorioUpdateComponent } from 'app/entities/productos-dormitorio/productos-dormitorio-update.component';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio/productos-dormitorio.service';
import { ProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';

describe('Component Tests', () => {
    describe('ProductosDormitorio Management Update Component', () => {
        let comp: ProductosDormitorioUpdateComponent;
        let fixture: ComponentFixture<ProductosDormitorioUpdateComponent>;
        let service: ProductosDormitorioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosDormitorioUpdateComponent]
            })
                .overrideTemplate(ProductosDormitorioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductosDormitorioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosDormitorioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductosDormitorio(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productosDormitorio = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductosDormitorio();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productosDormitorio = entity;
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
