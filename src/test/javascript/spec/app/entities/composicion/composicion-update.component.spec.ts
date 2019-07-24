/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ComposicionUpdateComponent } from 'app/entities/composicion/composicion-update.component';
import { ComposicionService } from 'app/entities/composicion/composicion.service';
import { Composicion } from 'app/shared/model/composicion.model';

describe('Component Tests', () => {
    describe('Composicion Management Update Component', () => {
        let comp: ComposicionUpdateComponent;
        let fixture: ComponentFixture<ComposicionUpdateComponent>;
        let service: ComposicionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ComposicionUpdateComponent]
            })
                .overrideTemplate(ComposicionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComposicionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComposicionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Composicion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.composicion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Composicion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.composicion = entity;
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
