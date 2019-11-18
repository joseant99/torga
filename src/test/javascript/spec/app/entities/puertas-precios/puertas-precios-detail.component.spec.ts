/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PuertasPreciosDetailComponent } from 'app/entities/puertas-precios/puertas-precios-detail.component';
import { PuertasPrecios } from 'app/shared/model/puertas-precios.model';

describe('Component Tests', () => {
    describe('PuertasPrecios Management Detail Component', () => {
        let comp: PuertasPreciosDetailComponent;
        let fixture: ComponentFixture<PuertasPreciosDetailComponent>;
        const route = ({ data: of({ puertasPrecios: new PuertasPrecios(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PuertasPreciosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PuertasPreciosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PuertasPreciosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.puertasPrecios).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
