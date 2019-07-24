/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosUpdateComponent } from 'app/entities/acabados/acabados-update.component';
import { AcabadosService } from 'app/entities/acabados/acabados.service';
import { Acabados } from 'app/shared/model/acabados.model';

describe('Component Tests', () => {
    describe('Acabados Management Update Component', () => {
        let comp: AcabadosUpdateComponent;
        let fixture: ComponentFixture<AcabadosUpdateComponent>;
        let service: AcabadosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosUpdateComponent]
            })
                .overrideTemplate(AcabadosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcabadosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcabadosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Acabados(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabados = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Acabados();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabados = entity;
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
