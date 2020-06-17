/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CajeadoUpdateComponent } from 'app/entities/cajeado/cajeado-update.component';
import { CajeadoService } from 'app/entities/cajeado/cajeado.service';
import { Cajeado } from 'app/shared/model/cajeado.model';

describe('Component Tests', () => {
    describe('Cajeado Management Update Component', () => {
        let comp: CajeadoUpdateComponent;
        let fixture: ComponentFixture<CajeadoUpdateComponent>;
        let service: CajeadoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CajeadoUpdateComponent]
            })
                .overrideTemplate(CajeadoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CajeadoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CajeadoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cajeado(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cajeado = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cajeado();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cajeado = entity;
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
