/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DimensionesProductoTipoDetailComponent } from 'app/entities/dimensiones-producto-tipo/dimensiones-producto-tipo-detail.component';
import { DimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';

describe('Component Tests', () => {
    describe('DimensionesProductoTipo Management Detail Component', () => {
        let comp: DimensionesProductoTipoDetailComponent;
        let fixture: ComponentFixture<DimensionesProductoTipoDetailComponent>;
        const route = ({ data: of({ dimensionesProductoTipo: new DimensionesProductoTipo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DimensionesProductoTipoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DimensionesProductoTipoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DimensionesProductoTipoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dimensionesProductoTipo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
