/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { VendedoresUpdateComponent } from 'app/entities/vendedores/vendedores-update.component';
import { VendedoresService } from 'app/entities/vendedores/vendedores.service';
import { Vendedores } from 'app/shared/model/vendedores.model';

describe('Component Tests', () => {
    describe('Vendedores Management Update Component', () => {
        let comp: VendedoresUpdateComponent;
        let fixture: ComponentFixture<VendedoresUpdateComponent>;
        let service: VendedoresService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [VendedoresUpdateComponent]
            })
                .overrideTemplate(VendedoresUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VendedoresUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendedoresService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Vendedores(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vendedores = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Vendedores();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vendedores = entity;
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
