/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresArmarioNuevosUpdateComponent } from 'app/entities/interiores-armario-nuevos/interiores-armario-nuevos-update.component';
import { InterioresArmarioNuevosService } from 'app/entities/interiores-armario-nuevos/interiores-armario-nuevos.service';
import { InterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';

describe('Component Tests', () => {
    describe('InterioresArmarioNuevos Management Update Component', () => {
        let comp: InterioresArmarioNuevosUpdateComponent;
        let fixture: ComponentFixture<InterioresArmarioNuevosUpdateComponent>;
        let service: InterioresArmarioNuevosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresArmarioNuevosUpdateComponent]
            })
                .overrideTemplate(InterioresArmarioNuevosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InterioresArmarioNuevosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterioresArmarioNuevosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new InterioresArmarioNuevos(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interioresArmarioNuevos = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new InterioresArmarioNuevos();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interioresArmarioNuevos = entity;
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
