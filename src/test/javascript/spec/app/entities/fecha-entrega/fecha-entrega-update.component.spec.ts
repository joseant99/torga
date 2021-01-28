/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Fecha_entregaUpdateComponent } from 'app/entities/fecha-entrega/fecha-entrega-update.component';
import { Fecha_entregaService } from 'app/entities/fecha-entrega/fecha-entrega.service';
import { Fecha_entrega } from 'app/shared/model/fecha-entrega.model';

describe('Component Tests', () => {
    describe('Fecha_entrega Management Update Component', () => {
        let comp: Fecha_entregaUpdateComponent;
        let fixture: ComponentFixture<Fecha_entregaUpdateComponent>;
        let service: Fecha_entregaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Fecha_entregaUpdateComponent]
            })
                .overrideTemplate(Fecha_entregaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Fecha_entregaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Fecha_entregaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Fecha_entrega(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.fecha_entrega = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Fecha_entrega();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.fecha_entrega = entity;
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
