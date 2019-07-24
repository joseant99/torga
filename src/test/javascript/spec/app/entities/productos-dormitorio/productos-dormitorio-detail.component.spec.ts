/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProductosDormitorioDetailComponent } from 'app/entities/productos-dormitorio/productos-dormitorio-detail.component';
import { ProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';

describe('Component Tests', () => {
    describe('ProductosDormitorio Management Detail Component', () => {
        let comp: ProductosDormitorioDetailComponent;
        let fixture: ComponentFixture<ProductosDormitorioDetailComponent>;
        const route = ({ data: of({ productosDormitorio: new ProductosDormitorio(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProductosDormitorioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductosDormitorioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosDormitorioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productosDormitorio).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
