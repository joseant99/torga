/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresentanteDetailComponent } from 'app/entities/representante/representante-detail.component';
import { Representante } from 'app/shared/model/representante.model';

describe('Component Tests', () => {
    describe('Representante Management Detail Component', () => {
        let comp: RepresentanteDetailComponent;
        let fixture: ComponentFixture<RepresentanteDetailComponent>;
        const route = ({ data: of({ representante: new Representante(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresentanteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepresentanteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepresentanteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.representante).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
