/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ExposicionUpdateComponent } from 'app/entities/exposicion/exposicion-update.component';
import { ExposicionService } from 'app/entities/exposicion/exposicion.service';
import { Exposicion } from 'app/shared/model/exposicion.model';

describe('Component Tests', () => {
    describe('Exposicion Management Update Component', () => {
        let comp: ExposicionUpdateComponent;
        let fixture: ComponentFixture<ExposicionUpdateComponent>;
        let service: ExposicionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ExposicionUpdateComponent]
            })
                .overrideTemplate(ExposicionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExposicionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExposicionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Exposicion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.exposicion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Exposicion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.exposicion = entity;
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
