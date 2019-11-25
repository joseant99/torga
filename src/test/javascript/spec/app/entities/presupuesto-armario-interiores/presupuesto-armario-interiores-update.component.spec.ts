/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioInterioresUpdateComponent } from 'app/entities/presupuesto-armario-interiores/presupuesto-armario-interiores-update.component';
import { PresupuestoArmarioInterioresService } from 'app/entities/presupuesto-armario-interiores/presupuesto-armario-interiores.service';
import { PresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';

describe('Component Tests', () => {
    describe('PresupuestoArmarioInteriores Management Update Component', () => {
        let comp: PresupuestoArmarioInterioresUpdateComponent;
        let fixture: ComponentFixture<PresupuestoArmarioInterioresUpdateComponent>;
        let service: PresupuestoArmarioInterioresService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioInterioresUpdateComponent]
            })
                .overrideTemplate(PresupuestoArmarioInterioresUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PresupuestoArmarioInterioresUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoArmarioInterioresService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoArmarioInteriores(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoArmarioInteriores = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoArmarioInteriores();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoArmarioInteriores = entity;
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
