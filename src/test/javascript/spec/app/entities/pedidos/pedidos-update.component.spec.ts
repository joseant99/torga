/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PedidosUpdateComponent } from 'app/entities/pedidos/pedidos-update.component';
import { PedidosService } from 'app/entities/pedidos/pedidos.service';
import { Pedidos } from 'app/shared/model/pedidos.model';

describe('Component Tests', () => {
    describe('Pedidos Management Update Component', () => {
        let comp: PedidosUpdateComponent;
        let fixture: ComponentFixture<PedidosUpdateComponent>;
        let service: PedidosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PedidosUpdateComponent]
            })
                .overrideTemplate(PedidosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PedidosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PedidosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Pedidos(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pedidos = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Pedidos();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pedidos = entity;
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
