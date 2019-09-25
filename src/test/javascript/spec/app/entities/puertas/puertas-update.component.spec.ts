/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PuertasUpdateComponent } from 'app/entities/puertas/puertas-update.component';
import { PuertasService } from 'app/entities/puertas/puertas.service';
import { Puertas } from 'app/shared/model/puertas.model';

describe('Component Tests', () => {
    describe('Puertas Management Update Component', () => {
        let comp: PuertasUpdateComponent;
        let fixture: ComponentFixture<PuertasUpdateComponent>;
        let service: PuertasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PuertasUpdateComponent]
            })
                .overrideTemplate(PuertasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PuertasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuertasService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Puertas(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.puertas = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Puertas();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.puertas = entity;
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
