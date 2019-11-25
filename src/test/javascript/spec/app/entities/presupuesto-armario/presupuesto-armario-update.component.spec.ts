/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioUpdateComponent } from 'app/entities/presupuesto-armario/presupuesto-armario-update.component';
import { PresupuestoArmarioService } from 'app/entities/presupuesto-armario/presupuesto-armario.service';
import { PresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';

describe('Component Tests', () => {
    describe('PresupuestoArmario Management Update Component', () => {
        let comp: PresupuestoArmarioUpdateComponent;
        let fixture: ComponentFixture<PresupuestoArmarioUpdateComponent>;
        let service: PresupuestoArmarioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioUpdateComponent]
            })
                .overrideTemplate(PresupuestoArmarioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PresupuestoArmarioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoArmarioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoArmario(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoArmario = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoArmario();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoArmario = entity;
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
