/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresArmarioNuevosDetailComponent } from 'app/entities/interiores-armario-nuevos/interiores-armario-nuevos-detail.component';
import { InterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';

describe('Component Tests', () => {
    describe('InterioresArmarioNuevos Management Detail Component', () => {
        let comp: InterioresArmarioNuevosDetailComponent;
        let fixture: ComponentFixture<InterioresArmarioNuevosDetailComponent>;
        const route = ({ data: of({ interioresArmarioNuevos: new InterioresArmarioNuevos(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresArmarioNuevosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InterioresArmarioNuevosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InterioresArmarioNuevosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.interioresArmarioNuevos).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
