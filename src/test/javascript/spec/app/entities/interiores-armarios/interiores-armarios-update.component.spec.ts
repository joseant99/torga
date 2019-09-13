/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresArmariosUpdateComponent } from 'app/entities/interiores-armarios/interiores-armarios-update.component';
import { InterioresArmariosService } from 'app/entities/interiores-armarios/interiores-armarios.service';
import { InterioresArmarios } from 'app/shared/model/interiores-armarios.model';

describe('Component Tests', () => {
    describe('InterioresArmarios Management Update Component', () => {
        let comp: InterioresArmariosUpdateComponent;
        let fixture: ComponentFixture<InterioresArmariosUpdateComponent>;
        let service: InterioresArmariosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresArmariosUpdateComponent]
            })
                .overrideTemplate(InterioresArmariosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InterioresArmariosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterioresArmariosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new InterioresArmarios(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interioresArmarios = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new InterioresArmarios();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interioresArmarios = entity;
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
