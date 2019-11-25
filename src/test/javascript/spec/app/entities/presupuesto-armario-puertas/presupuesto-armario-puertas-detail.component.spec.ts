/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioPuertasDetailComponent } from 'app/entities/presupuesto-armario-puertas/presupuesto-armario-puertas-detail.component';
import { PresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';

describe('Component Tests', () => {
    describe('PresupuestoArmarioPuertas Management Detail Component', () => {
        let comp: PresupuestoArmarioPuertasDetailComponent;
        let fixture: ComponentFixture<PresupuestoArmarioPuertasDetailComponent>;
        const route = ({ data: of({ presupuestoArmarioPuertas: new PresupuestoArmarioPuertas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioPuertasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PresupuestoArmarioPuertasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoArmarioPuertasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.presupuestoArmarioPuertas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
