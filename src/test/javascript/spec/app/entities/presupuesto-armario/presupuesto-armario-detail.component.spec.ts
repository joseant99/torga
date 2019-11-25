/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioDetailComponent } from 'app/entities/presupuesto-armario/presupuesto-armario-detail.component';
import { PresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';

describe('Component Tests', () => {
    describe('PresupuestoArmario Management Detail Component', () => {
        let comp: PresupuestoArmarioDetailComponent;
        let fixture: ComponentFixture<PresupuestoArmarioDetailComponent>;
        const route = ({ data: of({ presupuestoArmario: new PresupuestoArmario(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PresupuestoArmarioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoArmarioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.presupuestoArmario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
