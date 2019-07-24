/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CategoriasDormiUpdateComponent } from 'app/entities/categorias-dormi/categorias-dormi-update.component';
import { CategoriasDormiService } from 'app/entities/categorias-dormi/categorias-dormi.service';
import { CategoriasDormi } from 'app/shared/model/categorias-dormi.model';

describe('Component Tests', () => {
    describe('CategoriasDormi Management Update Component', () => {
        let comp: CategoriasDormiUpdateComponent;
        let fixture: ComponentFixture<CategoriasDormiUpdateComponent>;
        let service: CategoriasDormiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CategoriasDormiUpdateComponent]
            })
                .overrideTemplate(CategoriasDormiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoriasDormiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriasDormiService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CategoriasDormi(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categoriasDormi = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CategoriasDormi();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categoriasDormi = entity;
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
