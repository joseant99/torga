/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PedidosDetailComponent } from 'app/entities/pedidos/pedidos-detail.component';
import { Pedidos } from 'app/shared/model/pedidos.model';

describe('Component Tests', () => {
    describe('Pedidos Management Detail Component', () => {
        let comp: PedidosDetailComponent;
        let fixture: ComponentFixture<PedidosDetailComponent>;
        const route = ({ data: of({ pedidos: new Pedidos(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PedidosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PedidosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PedidosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pedidos).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
