/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PresupuestoArmarioPuertasUpdateComponent } from 'app/entities/presupuesto-armario-puertas/presupuesto-armario-puertas-update.component';
import { PresupuestoArmarioPuertasService } from 'app/entities/presupuesto-armario-puertas/presupuesto-armario-puertas.service';
import { PresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';

describe('Component Tests', () => {
    describe('PresupuestoArmarioPuertas Management Update Component', () => {
        let comp: PresupuestoArmarioPuertasUpdateComponent;
        let fixture: ComponentFixture<PresupuestoArmarioPuertasUpdateComponent>;
        let service: PresupuestoArmarioPuertasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PresupuestoArmarioPuertasUpdateComponent]
            })
                .overrideTemplate(PresupuestoArmarioPuertasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PresupuestoArmarioPuertasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresupuestoArmarioPuertasService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoArmarioPuertas(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoArmarioPuertas = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PresupuestoArmarioPuertas();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.presupuestoArmarioPuertas = entity;
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
