/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosProductoDetailComponent } from 'app/entities/acabados-producto/acabados-producto-detail.component';
import { AcabadosProducto } from 'app/shared/model/acabados-producto.model';

describe('Component Tests', () => {
    describe('AcabadosProducto Management Detail Component', () => {
        let comp: AcabadosProductoDetailComponent;
        let fixture: ComponentFixture<AcabadosProductoDetailComponent>;
        const route = ({ data: of({ acabadosProducto: new AcabadosProducto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosProductoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AcabadosProductoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcabadosProductoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acabadosProducto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
