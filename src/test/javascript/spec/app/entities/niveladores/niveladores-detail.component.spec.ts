/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { NiveladoresDetailComponent } from 'app/entities/niveladores/niveladores-detail.component';
import { Niveladores } from 'app/shared/model/niveladores.model';

describe('Component Tests', () => {
    describe('Niveladores Management Detail Component', () => {
        let comp: NiveladoresDetailComponent;
        let fixture: ComponentFixture<NiveladoresDetailComponent>;
        const route = ({ data: of({ niveladores: new Niveladores(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [NiveladoresDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NiveladoresDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NiveladoresDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.niveladores).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
