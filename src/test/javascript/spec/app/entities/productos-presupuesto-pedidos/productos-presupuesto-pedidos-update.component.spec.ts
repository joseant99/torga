/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosPresupuestoPedidosUpdateComponent } from 'app/entities/productos-presupuesto-pedidos/productos-presupuesto-pedidos-update.component';
import { ProductosPresupuestoPedidosService } from 'app/entities/productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { ProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';

describe('Component Tests', () => {
    describe('ProductosPresupuestoPedidos Management Update Component', () => {
        let comp: ProductosPresupuestoPedidosUpdateComponent;
        let fixture: ComponentFixture<ProductosPresupuestoPedidosUpdateComponent>;
        let service: ProductosPresupuestoPedidosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosPresupuestoPedidosUpdateComponent]
            })
                .overrideTemplate(ProductosPresupuestoPedidosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductosPresupuestoPedidosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosPresupuestoPedidosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductosPresupuestoPedidos(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productosPresupuestoPedidos = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductosPresupuestoPedidos();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productosPresupuestoPedidos = entity;
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
