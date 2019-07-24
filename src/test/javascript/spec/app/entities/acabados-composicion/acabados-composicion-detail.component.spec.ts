/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosComposicionDetailComponent } from 'app/entities/acabados-composicion/acabados-composicion-detail.component';
import { AcabadosComposicion } from 'app/shared/model/acabados-composicion.model';

describe('Component Tests', () => {
    describe('AcabadosComposicion Management Detail Component', () => {
        let comp: AcabadosComposicionDetailComponent;
        let fixture: ComponentFixture<AcabadosComposicionDetailComponent>;
        const route = ({ data: of({ acabadosComposicion: new AcabadosComposicion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosComposicionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AcabadosComposicionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcabadosComposicionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acabadosComposicion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
