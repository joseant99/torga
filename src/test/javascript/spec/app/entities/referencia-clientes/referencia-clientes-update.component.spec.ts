/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ReferenciaClientesUpdateComponent } from 'app/entities/referencia-clientes/referencia-clientes-update.component';
import { ReferenciaClientesService } from 'app/entities/referencia-clientes/referencia-clientes.service';
import { ReferenciaClientes } from 'app/shared/model/referencia-clientes.model';

describe('Component Tests', () => {
    describe('ReferenciaClientes Management Update Component', () => {
        let comp: ReferenciaClientesUpdateComponent;
        let fixture: ComponentFixture<ReferenciaClientesUpdateComponent>;
        let service: ReferenciaClientesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ReferenciaClientesUpdateComponent]
            })
                .overrideTemplate(ReferenciaClientesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReferenciaClientesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenciaClientesService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ReferenciaClientes(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.referenciaClientes = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ReferenciaClientes();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.referenciaClientes = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
