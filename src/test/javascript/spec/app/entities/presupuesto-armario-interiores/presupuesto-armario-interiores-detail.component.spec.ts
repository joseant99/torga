/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioInterioresDetailComponent } from 'app/entities/presupuesto-armario-interiores/presupuesto-armario-interiores-detail.component';
import { PresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';

describe('Component Tests', () => {
    describe('PresupuestoArmarioInteriores Management Detail Component', () => {
        let comp: PresupuestoArmarioInterioresDetailComponent;
        let fixture: ComponentFixture<PresupuestoArmarioInterioresDetailComponent>;
        const route = ({ data: of({ presupuestoArmarioInteriores: new PresupuestoArmarioInteriores(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioInterioresDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PresupuestoArmarioInterioresDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoArmarioInterioresDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.presupuestoArmarioInteriores).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
