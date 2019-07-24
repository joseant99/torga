/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DimensionesProductoTipoUpdateComponent } from 'app/entities/dimensiones-producto-tipo/dimensiones-producto-tipo-update.component';
import { DimensionesProductoTipoService } from 'app/entities/dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { DimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';

describe('Component Tests', () => {
    describe('DimensionesProductoTipo Management Update Component', () => {
        let comp: DimensionesProductoTipoUpdateComponent;
        let fixture: ComponentFixture<DimensionesProductoTipoUpdateComponent>;
        let service: DimensionesProductoTipoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DimensionesProductoTipoUpdateComponent]
            })
                .overrideTemplate(DimensionesProductoTipoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DimensionesProductoTipoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DimensionesProductoTipoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DimensionesProductoTipo(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dimensionesProductoTipo = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DimensionesProductoTipo();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dimensionesProductoTipo = entity;
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
