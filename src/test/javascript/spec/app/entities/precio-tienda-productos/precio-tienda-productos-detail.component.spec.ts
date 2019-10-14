/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioTiendaProductosDetailComponent } from 'app/entities/precio-tienda-productos/precio-tienda-productos-detail.component';
import { PrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';

describe('Component Tests', () => {
    describe('PrecioTiendaProductos Management Detail Component', () => {
        let comp: PrecioTiendaProductosDetailComponent;
        let fixture: ComponentFixture<PrecioTiendaProductosDetailComponent>;
        const route = ({ data: of({ precioTiendaProductos: new PrecioTiendaProductos(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioTiendaProductosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrecioTiendaProductosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrecioTiendaProductosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.precioTiendaProductos).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
