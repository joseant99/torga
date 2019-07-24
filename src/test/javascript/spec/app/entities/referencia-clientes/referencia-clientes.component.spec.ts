/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ReferenciaClientesComponent } from 'app/entities/referencia-clientes/referencia-clientes.component';
import { ReferenciaClientesService } from 'app/entities/referencia-clientes/referencia-clientes.service';
import { ReferenciaClientes } from 'app/shared/model/referencia-clientes.model';

describe('Component Tests', () => {
    describe('ReferenciaClientes Management Component', () => {
        let comp: ReferenciaClientesComponent;
        let fixture: ComponentFixture<ReferenciaClientesComponent>;
        let service: ReferenciaClientesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ReferenciaClientesComponent],
                providers: []
            })
                .overrideTemplate(ReferenciaClientesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReferenciaClientesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenciaClientesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReferenciaClientes(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.referenciaClientes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
