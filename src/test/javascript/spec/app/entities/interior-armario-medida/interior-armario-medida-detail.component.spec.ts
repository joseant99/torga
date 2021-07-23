/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InteriorArmarioMedidaDetailComponent } from 'app/entities/interior-armario-medida/interior-armario-medida-detail.component';
import { InteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';

describe('Component Tests', () => {
    describe('InteriorArmarioMedida Management Detail Component', () => {
        let comp: InteriorArmarioMedidaDetailComponent;
        let fixture: ComponentFixture<InteriorArmarioMedidaDetailComponent>;
        const route = ({ data: of({ interiorArmarioMedida: new InteriorArmarioMedida(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InteriorArmarioMedidaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InteriorArmarioMedidaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InteriorArmarioMedidaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.interiorArmarioMedida).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
