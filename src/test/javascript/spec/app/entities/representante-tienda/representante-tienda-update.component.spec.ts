/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresentanteTiendaUpdateComponent } from 'app/entities/representante-tienda/representante-tienda-update.component';
import { RepresentanteTiendaService } from 'app/entities/representante-tienda/representante-tienda.service';
import { RepresentanteTienda } from 'app/shared/model/representante-tienda.model';

describe('Component Tests', () => {
    describe('RepresentanteTienda Management Update Component', () => {
        let comp: RepresentanteTiendaUpdateComponent;
        let fixture: ComponentFixture<RepresentanteTiendaUpdateComponent>;
        let service: RepresentanteTiendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresentanteTiendaUpdateComponent]
            })
                .overrideTemplate(RepresentanteTiendaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepresentanteTiendaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepresentanteTiendaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new RepresentanteTienda(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.representanteTienda = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new RepresentanteTienda();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.representanteTienda = entity;
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
