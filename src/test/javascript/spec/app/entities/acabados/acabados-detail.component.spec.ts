/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosDetailComponent } from 'app/entities/acabados/acabados-detail.component';
import { Acabados } from 'app/shared/model/acabados.model';

describe('Component Tests', () => {
    describe('Acabados Management Detail Component', () => {
        let comp: AcabadosDetailComponent;
        let fixture: ComponentFixture<AcabadosDetailComponent>;
        const route = ({ data: of({ acabados: new Acabados(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AcabadosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcabadosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acabados).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
