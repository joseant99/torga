/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CoordenadasUpdateComponent } from 'app/entities/coordenadas/coordenadas-update.component';
import { CoordenadasService } from 'app/entities/coordenadas/coordenadas.service';
import { Coordenadas } from 'app/shared/model/coordenadas.model';

describe('Component Tests', () => {
    describe('Coordenadas Management Update Component', () => {
        let comp: CoordenadasUpdateComponent;
        let fixture: ComponentFixture<CoordenadasUpdateComponent>;
        let service: CoordenadasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CoordenadasUpdateComponent]
            })
                .overrideTemplate(CoordenadasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CoordenadasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoordenadasService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Coordenadas(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.coordenadas = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Coordenadas();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.coordenadas = entity;
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
