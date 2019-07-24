/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresentanteUpdateComponent } from 'app/entities/representante/representante-update.component';
import { RepresentanteService } from 'app/entities/representante/representante.service';
import { Representante } from 'app/shared/model/representante.model';

describe('Component Tests', () => {
    describe('Representante Management Update Component', () => {
        let comp: RepresentanteUpdateComponent;
        let fixture: ComponentFixture<RepresentanteUpdateComponent>;
        let service: RepresentanteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresentanteUpdateComponent]
            })
                .overrideTemplate(RepresentanteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepresentanteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepresentanteService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Representante(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.representante = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Representante();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.representante = entity;
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
