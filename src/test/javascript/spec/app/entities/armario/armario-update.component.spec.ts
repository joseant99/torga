/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ArmarioUpdateComponent } from 'app/entities/armario/armario-update.component';
import { ArmarioService } from 'app/entities/armario/armario.service';
import { Armario } from 'app/shared/model/armario.model';

describe('Component Tests', () => {
    describe('Armario Management Update Component', () => {
        let comp: ArmarioUpdateComponent;
        let fixture: ComponentFixture<ArmarioUpdateComponent>;
        let service: ArmarioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ArmarioUpdateComponent]
            })
                .overrideTemplate(ArmarioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArmarioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArmarioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Armario(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.armario = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Armario();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.armario = entity;
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
