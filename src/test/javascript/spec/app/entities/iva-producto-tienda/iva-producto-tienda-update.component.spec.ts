/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IvaProductoTiendaUpdateComponent } from 'app/entities/iva-producto-tienda/iva-producto-tienda-update.component';
import { IvaProductoTiendaService } from 'app/entities/iva-producto-tienda/iva-producto-tienda.service';
import { IvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';

describe('Component Tests', () => {
    describe('IvaProductoTienda Management Update Component', () => {
        let comp: IvaProductoTiendaUpdateComponent;
        let fixture: ComponentFixture<IvaProductoTiendaUpdateComponent>;
        let service: IvaProductoTiendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IvaProductoTiendaUpdateComponent]
            })
                .overrideTemplate(IvaProductoTiendaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IvaProductoTiendaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IvaProductoTiendaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IvaProductoTienda(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ivaProductoTienda = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IvaProductoTienda();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ivaProductoTienda = entity;
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
