/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioFinalPresuDetailComponent } from 'app/entities/precio-final-presu/precio-final-presu-detail.component';
import { PrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';

describe('Component Tests', () => {
    describe('PrecioFinalPresu Management Detail Component', () => {
        let comp: PrecioFinalPresuDetailComponent;
        let fixture: ComponentFixture<PrecioFinalPresuDetailComponent>;
        const route = ({ data: of({ precioFinalPresu: new PrecioFinalPresu(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioFinalPresuDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrecioFinalPresuDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrecioFinalPresuDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.precioFinalPresu).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
