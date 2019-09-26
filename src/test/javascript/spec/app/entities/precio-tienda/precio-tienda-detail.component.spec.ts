/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioTiendaDetailComponent } from 'app/entities/precio-tienda/precio-tienda-detail.component';
import { PrecioTienda } from 'app/shared/model/precio-tienda.model';

describe('Component Tests', () => {
    describe('PrecioTienda Management Detail Component', () => {
        let comp: PrecioTiendaDetailComponent;
        let fixture: ComponentFixture<PrecioTiendaDetailComponent>;
        const route = ({ data: of({ precioTienda: new PrecioTienda(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioTiendaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrecioTiendaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrecioTiendaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.precioTienda).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
