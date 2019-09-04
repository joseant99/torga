/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MedEspProductoPedidoPresuDetailComponent } from 'app/entities/med-esp-producto-pedido-presu/med-esp-producto-pedido-presu-detail.component';
import { MedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';

describe('Component Tests', () => {
    describe('MedEspProductoPedidoPresu Management Detail Component', () => {
        let comp: MedEspProductoPedidoPresuDetailComponent;
        let fixture: ComponentFixture<MedEspProductoPedidoPresuDetailComponent>;
        const route = ({ data: of({ medEspProductoPedidoPresu: new MedEspProductoPedidoPresu(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MedEspProductoPedidoPresuDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedEspProductoPedidoPresuDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedEspProductoPedidoPresuDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medEspProductoPedidoPresu).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
