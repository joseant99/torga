/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DimensionesProductoDetailComponent } from 'app/entities/dimensiones-producto/dimensiones-producto-detail.component';
import { DimensionesProducto } from 'app/shared/model/dimensiones-producto.model';

describe('Component Tests', () => {
    describe('DimensionesProducto Management Detail Component', () => {
        let comp: DimensionesProductoDetailComponent;
        let fixture: ComponentFixture<DimensionesProductoDetailComponent>;
        const route = ({ data: of({ dimensionesProducto: new DimensionesProducto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DimensionesProductoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DimensionesProductoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DimensionesProductoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dimensionesProducto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
