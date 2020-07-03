/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { FPagoDetailComponent } from 'app/entities/f-pago/f-pago-detail.component';
import { FPago } from 'app/shared/model/f-pago.model';

describe('Component Tests', () => {
    describe('FPago Management Detail Component', () => {
        let comp: FPagoDetailComponent;
        let fixture: ComponentFixture<FPagoDetailComponent>;
        const route = ({ data: of({ fPago: new FPago(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [FPagoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FPagoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FPagoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fPago).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
