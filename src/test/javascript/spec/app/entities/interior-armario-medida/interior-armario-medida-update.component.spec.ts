/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InteriorArmarioMedidaUpdateComponent } from 'app/entities/interior-armario-medida/interior-armario-medida-update.component';
import { InteriorArmarioMedidaService } from 'app/entities/interior-armario-medida/interior-armario-medida.service';
import { InteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';

describe('Component Tests', () => {
    describe('InteriorArmarioMedida Management Update Component', () => {
        let comp: InteriorArmarioMedidaUpdateComponent;
        let fixture: ComponentFixture<InteriorArmarioMedidaUpdateComponent>;
        let service: InteriorArmarioMedidaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InteriorArmarioMedidaUpdateComponent]
            })
                .overrideTemplate(InteriorArmarioMedidaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InteriorArmarioMedidaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteriorArmarioMedidaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new InteriorArmarioMedida(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interiorArmarioMedida = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new InteriorArmarioMedida();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interiorArmarioMedida = entity;
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
