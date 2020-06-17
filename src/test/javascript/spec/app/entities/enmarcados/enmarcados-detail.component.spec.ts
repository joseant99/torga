/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { EnmarcadosDetailComponent } from 'app/entities/enmarcados/enmarcados-detail.component';
import { Enmarcados } from 'app/shared/model/enmarcados.model';

describe('Component Tests', () => {
    describe('Enmarcados Management Detail Component', () => {
        let comp: EnmarcadosDetailComponent;
        let fixture: ComponentFixture<EnmarcadosDetailComponent>;
        const route = ({ data: of({ enmarcados: new Enmarcados(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [EnmarcadosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EnmarcadosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnmarcadosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.enmarcados).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
