/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ImagenDeCestaProdUpdateComponent } from 'app/entities/imagen-de-cesta-prod/imagen-de-cesta-prod-update.component';
import { ImagenDeCestaProdService } from 'app/entities/imagen-de-cesta-prod/imagen-de-cesta-prod.service';
import { ImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';

describe('Component Tests', () => {
    describe('ImagenDeCestaProd Management Update Component', () => {
        let comp: ImagenDeCestaProdUpdateComponent;
        let fixture: ComponentFixture<ImagenDeCestaProdUpdateComponent>;
        let service: ImagenDeCestaProdService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ImagenDeCestaProdUpdateComponent]
            })
                .overrideTemplate(ImagenDeCestaProdUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImagenDeCestaProdUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagenDeCestaProdService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ImagenDeCestaProd(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imagenDeCestaProd = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ImagenDeCestaProd();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imagenDeCestaProd = entity;
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
