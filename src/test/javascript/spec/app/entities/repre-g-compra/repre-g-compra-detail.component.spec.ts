/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepreGCompraDetailComponent } from 'app/entities/repre-g-compra/repre-g-compra-detail.component';
import { RepreGCompra } from 'app/shared/model/repre-g-compra.model';

describe('Component Tests', () => {
    describe('RepreGCompra Management Detail Component', () => {
        let comp: RepreGCompraDetailComponent;
        let fixture: ComponentFixture<RepreGCompraDetailComponent>;
        const route = ({ data: of({ repreGCompra: new RepreGCompra(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepreGCompraDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepreGCompraDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepreGCompraDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.repreGCompra).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
