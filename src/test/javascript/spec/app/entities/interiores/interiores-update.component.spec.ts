/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresUpdateComponent } from 'app/entities/interiores/interiores-update.component';
import { InterioresService } from 'app/entities/interiores/interiores.service';
import { Interiores } from 'app/shared/model/interiores.model';

describe('Component Tests', () => {
    describe('Interiores Management Update Component', () => {
        let comp: InterioresUpdateComponent;
        let fixture: ComponentFixture<InterioresUpdateComponent>;
        let service: InterioresService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresUpdateComponent]
            })
                .overrideTemplate(InterioresUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InterioresUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterioresService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Interiores(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interiores = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Interiores();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interiores = entity;
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
