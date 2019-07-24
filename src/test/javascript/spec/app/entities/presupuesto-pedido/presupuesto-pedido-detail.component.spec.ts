/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoPedidoDetailComponent } from 'app/entities/presupuesto-pedido/presupuesto-pedido-detail.component';
import { PresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';

describe('Component Tests', () => {
    describe('PresupuestoPedido Management Detail Component', () => {
        let comp: PresupuestoPedidoDetailComponent;
        let fixture: ComponentFixture<PresupuestoPedidoDetailComponent>;
        const route = ({ data: of({ presupuestoPedido: new PresupuestoPedido(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoPedidoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PresupuestoPedidoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresupuestoPedidoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.presupuestoPedido).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
