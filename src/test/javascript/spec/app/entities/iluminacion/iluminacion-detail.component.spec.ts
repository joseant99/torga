/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IluminacionDetailComponent } from 'app/entities/iluminacion/iluminacion-detail.component';
import { Iluminacion } from 'app/shared/model/iluminacion.model';

describe('Component Tests', () => {
    describe('Iluminacion Management Detail Component', () => {
        let comp: IluminacionDetailComponent;
        let fixture: ComponentFixture<IluminacionDetailComponent>;
        const route = ({ data: of({ iluminacion: new Iluminacion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IluminacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IluminacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IluminacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.iluminacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
