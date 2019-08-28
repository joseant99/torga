/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IluminacionProdPrePedUpdateComponent } from 'app/entities/iluminacion-prod-pre-ped/iluminacion-prod-pre-ped-update.component';
import { IluminacionProdPrePedService } from 'app/entities/iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { IluminacionProdPrePed } from 'app/shared/model/iluminacion-prod-pre-ped.model';

describe('Component Tests', () => {
    describe('IluminacionProdPrePed Management Update Component', () => {
        let comp: IluminacionProdPrePedUpdateComponent;
        let fixture: ComponentFixture<IluminacionProdPrePedUpdateComponent>;
        let service: IluminacionProdPrePedService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IluminacionProdPrePedUpdateComponent]
            })
                .overrideTemplate(IluminacionProdPrePedUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IluminacionProdPrePedUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IluminacionProdPrePedService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IluminacionProdPrePed(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.iluminacionProdPrePed = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IluminacionProdPrePed();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.iluminacionProdPrePed = entity;
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
