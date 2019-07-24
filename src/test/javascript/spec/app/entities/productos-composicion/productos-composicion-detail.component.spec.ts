/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosComposicionDetailComponent } from 'app/entities/productos-composicion/productos-composicion-detail.component';
import { ProductosComposicion } from 'app/shared/model/productos-composicion.model';

describe('Component Tests', () => {
    describe('ProductosComposicion Management Detail Component', () => {
        let comp: ProductosComposicionDetailComponent;
        let fixture: ComponentFixture<ProductosComposicionDetailComponent>;
        const route = ({ data: of({ productosComposicion: new ProductosComposicion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosComposicionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductosComposicionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosComposicionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productosComposicion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
