/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosComposicionUpdateComponent } from 'app/entities/productos-composicion/productos-composicion-update.component';
import { ProductosComposicionService } from 'app/entities/productos-composicion/productos-composicion.service';
import { ProductosComposicion } from 'app/shared/model/productos-composicion.model';

describe('Component Tests', () => {
    describe('ProductosComposicion Management Update Component', () => {
        let comp: ProductosComposicionUpdateComponent;
        let fixture: ComponentFixture<ProductosComposicionUpdateComponent>;
        let service: ProductosComposicionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosComposicionUpdateComponent]
            })
                .overrideTemplate(ProductosComposicionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductosComposicionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosComposicionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductosComposicion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productosComposicion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductosComposicion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productosComposicion = entity;
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
