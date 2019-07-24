/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Categorias_DormitorioUpdateComponent } from 'app/entities/categorias-dormitorio/categorias-dormitorio-update.component';
import { Categorias_DormitorioService } from 'app/entities/categorias-dormitorio/categorias-dormitorio.service';
import { Categorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';

describe('Component Tests', () => {
    describe('Categorias_Dormitorio Management Update Component', () => {
        let comp: Categorias_DormitorioUpdateComponent;
        let fixture: ComponentFixture<Categorias_DormitorioUpdateComponent>;
        let service: Categorias_DormitorioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Categorias_DormitorioUpdateComponent]
            })
                .overrideTemplate(Categorias_DormitorioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(Categorias_DormitorioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Categorias_DormitorioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Categorias_Dormitorio(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categorias_Dormitorio = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Categorias_Dormitorio();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categorias_Dormitorio = entity;
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
