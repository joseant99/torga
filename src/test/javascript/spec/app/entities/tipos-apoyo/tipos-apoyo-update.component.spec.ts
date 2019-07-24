/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TiposApoyoUpdateComponent } from 'app/entities/tipos-apoyo/tipos-apoyo-update.component';
import { TiposApoyoService } from 'app/entities/tipos-apoyo/tipos-apoyo.service';
import { TiposApoyo } from 'app/shared/model/tipos-apoyo.model';

describe('Component Tests', () => {
    describe('TiposApoyo Management Update Component', () => {
        let comp: TiposApoyoUpdateComponent;
        let fixture: ComponentFixture<TiposApoyoUpdateComponent>;
        let service: TiposApoyoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TiposApoyoUpdateComponent]
            })
                .overrideTemplate(TiposApoyoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TiposApoyoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TiposApoyoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TiposApoyo(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tiposApoyo = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TiposApoyo();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tiposApoyo = entity;
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
