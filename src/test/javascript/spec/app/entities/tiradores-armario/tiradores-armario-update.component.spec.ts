/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TiradoresArmarioUpdateComponent } from 'app/entities/tiradores-armario/tiradores-armario-update.component';
import { TiradoresArmarioService } from 'app/entities/tiradores-armario/tiradores-armario.service';
import { TiradoresArmario } from 'app/shared/model/tiradores-armario.model';

describe('Component Tests', () => {
    describe('TiradoresArmario Management Update Component', () => {
        let comp: TiradoresArmarioUpdateComponent;
        let fixture: ComponentFixture<TiradoresArmarioUpdateComponent>;
        let service: TiradoresArmarioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TiradoresArmarioUpdateComponent]
            })
                .overrideTemplate(TiradoresArmarioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TiradoresArmarioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TiradoresArmarioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TiradoresArmario(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tiradoresArmario = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TiradoresArmario();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tiradoresArmario = entity;
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
