/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { EnmarcadosUpdateComponent } from 'app/entities/enmarcados/enmarcados-update.component';
import { EnmarcadosService } from 'app/entities/enmarcados/enmarcados.service';
import { Enmarcados } from 'app/shared/model/enmarcados.model';

describe('Component Tests', () => {
    describe('Enmarcados Management Update Component', () => {
        let comp: EnmarcadosUpdateComponent;
        let fixture: ComponentFixture<EnmarcadosUpdateComponent>;
        let service: EnmarcadosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [EnmarcadosUpdateComponent]
            })
                .overrideTemplate(EnmarcadosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EnmarcadosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnmarcadosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Enmarcados(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.enmarcados = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Enmarcados();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.enmarcados = entity;
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
