/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosProductosPresupuestoPedidoDetailComponent } from 'app/entities/acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido-detail.component';
import { AcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';

describe('Component Tests', () => {
    describe('AcabadosProductosPresupuestoPedido Management Detail Component', () => {
        let comp: AcabadosProductosPresupuestoPedidoDetailComponent;
        let fixture: ComponentFixture<AcabadosProductosPresupuestoPedidoDetailComponent>;
        const route = ({
            data: of({ acabadosProductosPresupuestoPedido: new AcabadosProductosPresupuestoPedido(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosProductosPresupuestoPedidoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AcabadosProductosPresupuestoPedidoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcabadosProductosPresupuestoPedidoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acabadosProductosPresupuestoPedido).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
