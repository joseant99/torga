/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DatosUsuarioUpdateComponent } from 'app/entities/datos-usuario/datos-usuario-update.component';
import { DatosUsuarioService } from 'app/entities/datos-usuario/datos-usuario.service';
import { DatosUsuario } from 'app/shared/model/datos-usuario.model';

describe('Component Tests', () => {
    describe('DatosUsuario Management Update Component', () => {
        let comp: DatosUsuarioUpdateComponent;
        let fixture: ComponentFixture<DatosUsuarioUpdateComponent>;
        let service: DatosUsuarioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DatosUsuarioUpdateComponent]
            })
                .overrideTemplate(DatosUsuarioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DatosUsuarioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatosUsuarioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DatosUsuario(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.datosUsuario = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DatosUsuario();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.datosUsuario = entity;
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
