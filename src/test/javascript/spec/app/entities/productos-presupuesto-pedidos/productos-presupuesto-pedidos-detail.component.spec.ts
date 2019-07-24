/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosPresupuestoPedidosDetailComponent } from 'app/entities/productos-presupuesto-pedidos/productos-presupuesto-pedidos-detail.component';
import { ProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';

describe('Component Tests', () => {
    describe('ProductosPresupuestoPedidos Management Detail Component', () => {
        let comp: ProductosPresupuestoPedidosDetailComponent;
        let fixture: ComponentFixture<ProductosPresupuestoPedidosDetailComponent>;
        const route = ({ data: of({ productosPresupuestoPedidos: new ProductosPresupuestoPedidos(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosPresupuestoPedidosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductosPresupuestoPedidosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosPresupuestoPedidosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productosPresupuestoPedidos).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
