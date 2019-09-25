/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PuertasDetailComponent } from 'app/entities/puertas/puertas-detail.component';
import { Puertas } from 'app/shared/model/puertas.model';

describe('Component Tests', () => {
    describe('Puertas Management Detail Component', () => {
        let comp: PuertasDetailComponent;
        let fixture: ComponentFixture<PuertasDetailComponent>;
        const route = ({ data: of({ puertas: new Puertas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PuertasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PuertasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PuertasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.puertas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
