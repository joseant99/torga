/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresentanteTiendaDetailComponent } from 'app/entities/representante-tienda/representante-tienda-detail.component';
import { RepresentanteTienda } from 'app/shared/model/representante-tienda.model';

describe('Component Tests', () => {
    describe('RepresentanteTienda Management Detail Component', () => {
        let comp: RepresentanteTiendaDetailComponent;
        let fixture: ComponentFixture<RepresentanteTiendaDetailComponent>;
        const route = ({ data: of({ representanteTienda: new RepresentanteTienda(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresentanteTiendaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepresentanteTiendaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepresentanteTiendaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.representanteTienda).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
