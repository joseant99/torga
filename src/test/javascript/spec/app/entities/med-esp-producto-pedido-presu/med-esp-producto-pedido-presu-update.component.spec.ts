/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MedEspProductoPedidoPresuUpdateComponent } from 'app/entities/med-esp-producto-pedido-presu/med-esp-producto-pedido-presu-update.component';
import { MedEspProductoPedidoPresuService } from 'app/entities/med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { MedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';

describe('Component Tests', () => {
    describe('MedEspProductoPedidoPresu Management Update Component', () => {
        let comp: MedEspProductoPedidoPresuUpdateComponent;
        let fixture: ComponentFixture<MedEspProductoPedidoPresuUpdateComponent>;
        let service: MedEspProductoPedidoPresuService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MedEspProductoPedidoPresuUpdateComponent]
            })
                .overrideTemplate(MedEspProductoPedidoPresuUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedEspProductoPedidoPresuUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedEspProductoPedidoPresuService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedEspProductoPedidoPresu(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medEspProductoPedidoPresu = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new MedEspProductoPedidoPresu();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.medEspProductoPedidoPresu = entity;
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
