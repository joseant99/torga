/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ZonasUpdateComponent } from 'app/entities/zonas/zonas-update.component';
import { ZonasService } from 'app/entities/zonas/zonas.service';
import { Zonas } from 'app/shared/model/zonas.model';

describe('Component Tests', () => {
    describe('Zonas Management Update Component', () => {
        let comp: ZonasUpdateComponent;
        let fixture: ComponentFixture<ZonasUpdateComponent>;
        let service: ZonasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ZonasUpdateComponent]
            })
                .overrideTemplate(ZonasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZonasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZonasService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Zonas(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.zonas = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Zonas();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.zonas = entity;
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
