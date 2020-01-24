/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { PrecioFinalPresuUpdateComponent } from 'app/entities/precio-final-presu/precio-final-presu-update.component';
import { PrecioFinalPresuService } from 'app/entities/precio-final-presu/precio-final-presu.service';
import { PrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';

describe('Component Tests', () => {
    describe('PrecioFinalPresu Management Update Component', () => {
        let comp: PrecioFinalPresuUpdateComponent;
        let fixture: ComponentFixture<PrecioFinalPresuUpdateComponent>;
        let service: PrecioFinalPresuService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [PrecioFinalPresuUpdateComponent]
            })
                .overrideTemplate(PrecioFinalPresuUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrecioFinalPresuUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioFinalPresuService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PrecioFinalPresu(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.precioFinalPresu = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PrecioFinalPresu();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.precioFinalPresu = entity;
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
