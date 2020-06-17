/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { NiveladoresUpdateComponent } from 'app/entities/niveladores/niveladores-update.component';
import { NiveladoresService } from 'app/entities/niveladores/niveladores.service';
import { Niveladores } from 'app/shared/model/niveladores.model';

describe('Component Tests', () => {
    describe('Niveladores Management Update Component', () => {
        let comp: NiveladoresUpdateComponent;
        let fixture: ComponentFixture<NiveladoresUpdateComponent>;
        let service: NiveladoresService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [NiveladoresUpdateComponent]
            })
                .overrideTemplate(NiveladoresUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NiveladoresUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveladoresService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Niveladores(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.niveladores = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Niveladores();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.niveladores = entity;
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
