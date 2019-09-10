/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MensajesUpdateComponent } from 'app/entities/mensajes/mensajes-update.component';
import { MensajesService } from 'app/entities/mensajes/mensajes.service';
import { Mensajes } from 'app/shared/model/mensajes.model';

describe('Component Tests', () => {
    describe('Mensajes Management Update Component', () => {
        let comp: MensajesUpdateComponent;
        let fixture: ComponentFixture<MensajesUpdateComponent>;
        let service: MensajesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MensajesUpdateComponent]
            })
                .overrideTemplate(MensajesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MensajesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MensajesService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Mensajes(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mensajes = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Mensajes();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mensajes = entity;
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
