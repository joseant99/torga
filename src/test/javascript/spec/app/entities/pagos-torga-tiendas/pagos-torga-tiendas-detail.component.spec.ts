/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PagosTorgaTiendasDetailComponent } from 'app/entities/pagos-torga-tiendas/pagos-torga-tiendas-detail.component';
import { PagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';

describe('Component Tests', () => {
    describe('PagosTorgaTiendas Management Detail Component', () => {
        let comp: PagosTorgaTiendasDetailComponent;
        let fixture: ComponentFixture<PagosTorgaTiendasDetailComponent>;
        const route = ({ data: of({ pagosTorgaTiendas: new PagosTorgaTiendas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PagosTorgaTiendasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PagosTorgaTiendasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PagosTorgaTiendasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pagosTorgaTiendas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
