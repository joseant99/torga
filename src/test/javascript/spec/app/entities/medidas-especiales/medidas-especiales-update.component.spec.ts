/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MedidasEspecialesUpdateComponent } from 'app/entities/medidas-especiales/medidas-especiales-update.component';
import { MedidasEspecialesService } from 'app/entities/medidas-especiales/medidas-especiales.service';
import { MedidasEspeciales } from 'app/shared/model/medidas-especiales.model';

describe('Component Tests', () => {
    describe('MedidasEspeciales Management Update Component', () => {
        let comp: MedidasEspecialesUpdateComponent;
        let fixture: ComponentFixture<MedidasEspecialesUpdateComponent>;
        let service: MedidasEspecialesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MedidasEspecialesUpdateComponent]
            })
                .overrideTemplate(MedidasEspecialesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedidasEspecialesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedidasEspecialesService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedidasEspeciales(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medidasEspeciales = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedidasEspeciales();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medidasEspeciales = entity;
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
