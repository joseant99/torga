/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DatosClienteUpdateComponent } from 'app/entities/datos-cliente/datos-cliente-update.component';
import { DatosClienteService } from 'app/entities/datos-cliente/datos-cliente.service';
import { DatosCliente } from 'app/shared/model/datos-cliente.model';

describe('Component Tests', () => {
    describe('DatosCliente Management Update Component', () => {
        let comp: DatosClienteUpdateComponent;
        let fixture: ComponentFixture<DatosClienteUpdateComponent>;
        let service: DatosClienteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DatosClienteUpdateComponent]
            })
                .overrideTemplate(DatosClienteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DatosClienteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatosClienteService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DatosCliente(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.datosCliente = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DatosCliente();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.datosCliente = entity;
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
