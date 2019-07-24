/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcabadosComposicionUpdateComponent } from 'app/entities/acabados-composicion/acabados-composicion-update.component';
import { AcabadosComposicionService } from 'app/entities/acabados-composicion/acabados-composicion.service';
import { AcabadosComposicion } from 'app/shared/model/acabados-composicion.model';

describe('Component Tests', () => {
    describe('AcabadosComposicion Management Update Component', () => {
        let comp: AcabadosComposicionUpdateComponent;
        let fixture: ComponentFixture<AcabadosComposicionUpdateComponent>;
        let service: AcabadosComposicionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcabadosComposicionUpdateComponent]
            })
                .overrideTemplate(AcabadosComposicionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcabadosComposicionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcabadosComposicionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AcabadosComposicion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabadosComposicion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AcabadosComposicion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.acabadosComposicion = entity;
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
