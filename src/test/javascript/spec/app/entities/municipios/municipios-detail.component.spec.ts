/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MunicipiosDetailComponent } from 'app/entities/municipios/municipios-detail.component';
import { Municipios } from 'app/shared/model/municipios.model';

describe('Component Tests', () => {
    describe('Municipios Management Detail Component', () => {
        let comp: MunicipiosDetailComponent;
        let fixture: ComponentFixture<MunicipiosDetailComponent>;
        const route = ({ data: of({ municipios: new Municipios(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MunicipiosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MunicipiosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MunicipiosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.municipios).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
