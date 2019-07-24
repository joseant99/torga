/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Acabados_ProductosDetailComponent } from 'app/entities/acabados-productos/acabados-productos-detail.component';
import { Acabados_Productos } from 'app/shared/model/acabados-productos.model';

describe('Component Tests', () => {
    describe('Acabados_Productos Management Detail Component', () => {
        let comp: Acabados_ProductosDetailComponent;
        let fixture: ComponentFixture<Acabados_ProductosDetailComponent>;
        const route = ({ data: of({ acabados_Productos: new Acabados_Productos(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Acabados_ProductosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Acabados_ProductosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Acabados_ProductosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acabados_Productos).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
