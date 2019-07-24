/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ReferenciaClientesDetailComponent } from 'app/entities/referencia-clientes/referencia-clientes-detail.component';
import { ReferenciaClientes } from 'app/shared/model/referencia-clientes.model';

describe('Component Tests', () => {
    describe('ReferenciaClientes Management Detail Component', () => {
        let comp: ReferenciaClientesDetailComponent;
        let fixture: ComponentFixture<ReferenciaClientesDetailComponent>;
        const route = ({ data: of({ referenciaClientes: new ReferenciaClientes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ReferenciaClientesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReferenciaClientesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReferenciaClientesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.referenciaClientes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
