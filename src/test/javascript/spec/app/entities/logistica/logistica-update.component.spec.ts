/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { LogisticaUpdateComponent } from 'app/entities/logistica/logistica-update.component';
import { LogisticaService } from 'app/entities/logistica/logistica.service';
import { Logistica } from 'app/shared/model/logistica.model';

describe('Component Tests', () => {
    describe('Logistica Management Update Component', () => {
        let comp: LogisticaUpdateComponent;
        let fixture: ComponentFixture<LogisticaUpdateComponent>;
        let service: LogisticaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [LogisticaUpdateComponent]
            })
                .overrideTemplate(LogisticaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LogisticaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogisticaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Logistica(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.logistica = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Logistica();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.logistica = entity;
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
