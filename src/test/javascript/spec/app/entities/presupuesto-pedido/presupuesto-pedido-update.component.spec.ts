/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoPedidoUpdateComponent } from 'app/entities/presupuesto-pedido/presupuesto-pedido-update.component';
import { PresupuestoPedidoService } from 'app/entities/presupuesto-pedido/presupuesto-pedido.service';
import { PresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';

describe('Component Tests', () => {
    describe('PresupuestoPedido Management Update Component', () => {
        let comp: PresupuestoPedidoUpdateComponent;
        let fixture: ComponentFixture<PresupuestoPedidoUpdateComponent>;
        let service: PresupuestoPedidoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoPedidoUpdateComponent]
            })
                .overrideTemplate(PresupuestoPedidoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PresupuestoPedidoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoPedidoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoPedido(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoPedido = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoPedido();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoPedido = entity;
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
