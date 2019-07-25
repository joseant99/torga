/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ProvinciasDetailComponent } from 'app/entities/provincias/provincias-detail.component';
import { Provincias } from 'app/shared/model/provincias.model';

describe('Component Tests', () => {
    describe('Provincias Management Detail Component', () => {
        let comp: ProvinciasDetailComponent;
        let fixture: ComponentFixture<ProvinciasDetailComponent>;
        const route = ({ data: of({ provincias: new Provincias(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ProvinciasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProvinciasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProvinciasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.provincias).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
