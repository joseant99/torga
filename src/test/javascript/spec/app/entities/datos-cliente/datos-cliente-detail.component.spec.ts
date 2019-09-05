/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DatosClienteDetailComponent } from 'app/entities/datos-cliente/datos-cliente-detail.component';
import { DatosCliente } from 'app/shared/model/datos-cliente.model';

describe('Component Tests', () => {
    describe('DatosCliente Management Detail Component', () => {
        let comp: DatosClienteDetailComponent;
        let fixture: ComponentFixture<DatosClienteDetailComponent>;
        const route = ({ data: of({ datosCliente: new DatosCliente(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DatosClienteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DatosClienteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DatosClienteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.datosCliente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
