/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PagosTiendaDetailComponent } from 'app/entities/pagos-tienda/pagos-tienda-detail.component';
import { PagosTienda } from 'app/shared/model/pagos-tienda.model';

describe('Component Tests', () => {
    describe('PagosTienda Management Detail Component', () => {
        let comp: PagosTiendaDetailComponent;
        let fixture: ComponentFixture<PagosTiendaDetailComponent>;
        const route = ({ data: of({ pagosTienda: new PagosTienda(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PagosTiendaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PagosTiendaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PagosTiendaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pagosTienda).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
