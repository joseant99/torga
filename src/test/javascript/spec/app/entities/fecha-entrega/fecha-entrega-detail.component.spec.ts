/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Fecha_entregaDetailComponent } from 'app/entities/fecha-entrega/fecha-entrega-detail.component';
import { Fecha_entrega } from 'app/shared/model/fecha-entrega.model';

describe('Component Tests', () => {
    describe('Fecha_entrega Management Detail Component', () => {
        let comp: Fecha_entregaDetailComponent;
        let fixture: ComponentFixture<Fecha_entregaDetailComponent>;
        const route = ({ data: of({ fecha_entrega: new Fecha_entrega(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Fecha_entregaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Fecha_entregaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Fecha_entregaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fecha_entrega).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
