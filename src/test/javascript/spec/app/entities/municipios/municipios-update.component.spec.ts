/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MunicipiosUpdateComponent } from 'app/entities/municipios/municipios-update.component';
import { MunicipiosService } from 'app/entities/municipios/municipios.service';
import { Municipios } from 'app/shared/model/municipios.model';

describe('Component Tests', () => {
    describe('Municipios Management Update Component', () => {
        let comp: MunicipiosUpdateComponent;
        let fixture: ComponentFixture<MunicipiosUpdateComponent>;
        let service: MunicipiosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MunicipiosUpdateComponent]
            })
                .overrideTemplate(MunicipiosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MunicipiosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MunicipiosService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Municipios(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.municipios = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Municipios();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.municipios = entity;
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
