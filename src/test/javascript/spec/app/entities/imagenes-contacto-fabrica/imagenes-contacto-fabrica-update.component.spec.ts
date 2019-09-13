/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ImagenesContactoFabricaUpdateComponent } from 'app/entities/imagenes-contacto-fabrica/imagenes-contacto-fabrica-update.component';
import { ImagenesContactoFabricaService } from 'app/entities/imagenes-contacto-fabrica/imagenes-contacto-fabrica.service';
import { ImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';

describe('Component Tests', () => {
    describe('ImagenesContactoFabrica Management Update Component', () => {
        let comp: ImagenesContactoFabricaUpdateComponent;
        let fixture: ComponentFixture<ImagenesContactoFabricaUpdateComponent>;
        let service: ImagenesContactoFabricaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ImagenesContactoFabricaUpdateComponent]
            })
                .overrideTemplate(ImagenesContactoFabricaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImagenesContactoFabricaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagenesContactoFabricaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ImagenesContactoFabrica(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imagenesContactoFabrica = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ImagenesContactoFabrica();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imagenesContactoFabrica = entity;
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
