/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosProductoUpdateComponent } from 'app/entities/acabados-producto/acabados-producto-update.component';
import { AcabadosProductoService } from 'app/entities/acabados-producto/acabados-producto.service';
import { AcabadosProducto } from 'app/shared/model/acabados-producto.model';

describe('Component Tests', () => {
    describe('AcabadosProducto Management Update Component', () => {
        let comp: AcabadosProductoUpdateComponent;
        let fixture: ComponentFixture<AcabadosProductoUpdateComponent>;
        let service: AcabadosProductoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosProductoUpdateComponent]
            })
                .overrideTemplate(AcabadosProductoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcabadosProductoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcabadosProductoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AcabadosProducto(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabadosProducto = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AcabadosProducto();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabadosProducto = entity;
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
