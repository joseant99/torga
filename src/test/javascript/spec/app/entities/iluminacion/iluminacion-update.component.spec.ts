/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IluminacionUpdateComponent } from 'app/entities/iluminacion/iluminacion-update.component';
import { IluminacionService } from 'app/entities/iluminacion/iluminacion.service';
import { Iluminacion } from 'app/shared/model/iluminacion.model';

describe('Component Tests', () => {
    describe('Iluminacion Management Update Component', () => {
        let comp: IluminacionUpdateComponent;
        let fixture: ComponentFixture<IluminacionUpdateComponent>;
        let service: IluminacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IluminacionUpdateComponent]
            })
                .overrideTemplate(IluminacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IluminacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IluminacionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Iluminacion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.iluminacion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Iluminacion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.iluminacion = entity;
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
