/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IluminacionProdPrePedDetailComponent } from 'app/entities/iluminacion-prod-pre-ped/iluminacion-prod-pre-ped-detail.component';
import { IluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';

describe('Component Tests', () => {
    describe('IluminacionProdPrePed Management Detail Component', () => {
        let comp: IluminacionProdPrePedDetailComponent;
        let fixture: ComponentFixture<IluminacionProdPrePedDetailComponent>;
        const route = ({ data: of({ iluminacionProdPrePed: new IluminacionProdPrePed(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IluminacionProdPrePedDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IluminacionProdPrePedDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IluminacionProdPrePedDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.iluminacionProdPrePed).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
