/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PuertasPreciosUpdateComponent } from 'app/entities/puertas-precios/puertas-precios-update.component';
import { PuertasPreciosService } from 'app/entities/puertas-precios/puertas-precios.service';
import { PuertasPrecios } from 'app/shared/model/puertas-precios.model';

describe('Component Tests', () => {
    describe('PuertasPrecios Management Update Component', () => {
        let comp: PuertasPreciosUpdateComponent;
        let fixture: ComponentFixture<PuertasPreciosUpdateComponent>;
        let service: PuertasPreciosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PuertasPreciosUpdateComponent]
            })
                .overrideTemplate(PuertasPreciosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PuertasPreciosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuertasPreciosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PuertasPrecios(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.puertasPrecios = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PuertasPrecios();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.puertasPrecios = entity;
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
