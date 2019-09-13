/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InteriorArmarioDentroDetailComponent } from 'app/entities/interior-armario-dentro/interior-armario-dentro-detail.component';
import { InteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';

describe('Component Tests', () => {
    describe('InteriorArmarioDentro Management Detail Component', () => {
        let comp: InteriorArmarioDentroDetailComponent;
        let fixture: ComponentFixture<InteriorArmarioDentroDetailComponent>;
        const route = ({ data: of({ interiorArmarioDentro: new InteriorArmarioDentro(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InteriorArmarioDentroDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InteriorArmarioDentroDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InteriorArmarioDentroDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.interiorArmarioDentro).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
