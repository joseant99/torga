/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosProductosPresupuestoPedidoUpdateComponent } from 'app/entities/acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido-update.component';
import { AcabadosProductosPresupuestoPedidoService } from 'app/entities/acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { AcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';

describe('Component Tests', () => {
    describe('AcabadosProductosPresupuestoPedido Management Update Component', () => {
        let comp: AcabadosProductosPresupuestoPedidoUpdateComponent;
        let fixture: ComponentFixture<AcabadosProductosPresupuestoPedidoUpdateComponent>;
        let service: AcabadosProductosPresupuestoPedidoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosProductosPresupuestoPedidoUpdateComponent]
            })
                .overrideTemplate(AcabadosProductosPresupuestoPedidoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcabadosProductosPresupuestoPedidoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcabadosProductosPresupuestoPedidoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AcabadosProductosPresupuestoPedido(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabadosProductosPresupuestoPedido = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AcabadosProductosPresupuestoPedido();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabadosProductosPresupuestoPedido = entity;
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
