/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepreGCompraUpdateComponent } from 'app/entities/repre-g-compra/repre-g-compra-update.component';
import { RepreGCompraService } from 'app/entities/repre-g-compra/repre-g-compra.service';
import { RepreGCompra } from 'app/shared/model/repre-g-compra.model';

describe('Component Tests', () => {
    describe('RepreGCompra Management Update Component', () => {
        let comp: RepreGCompraUpdateComponent;
        let fixture: ComponentFixture<RepreGCompraUpdateComponent>;
        let service: RepreGCompraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepreGCompraUpdateComponent]
            })
                .overrideTemplate(RepreGCompraUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepreGCompraUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepreGCompraService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new RepreGCompra(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.repreGCompra = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new RepreGCompra();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.repreGCompra = entity;
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
