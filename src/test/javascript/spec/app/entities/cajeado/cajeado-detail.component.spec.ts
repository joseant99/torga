/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CajeadoDetailComponent } from 'app/entities/cajeado/cajeado-detail.component';
import { Cajeado } from 'app/shared/model/cajeado.model';

describe('Component Tests', () => {
    describe('Cajeado Management Detail Component', () => {
        let comp: CajeadoDetailComponent;
        let fixture: ComponentFixture<CajeadoDetailComponent>;
        const route = ({ data: of({ cajeado: new Cajeado(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CajeadoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CajeadoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CajeadoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cajeado).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
