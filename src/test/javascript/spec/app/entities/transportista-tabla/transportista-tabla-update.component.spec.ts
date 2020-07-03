/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TransportistaTablaUpdateComponent } from 'app/entities/transportista-tabla/transportista-tabla-update.component';
import { TransportistaTablaService } from 'app/entities/transportista-tabla/transportista-tabla.service';
import { TransportistaTabla } from 'app/shared/model/transportista-tabla.model';

describe('Component Tests', () => {
    describe('TransportistaTabla Management Update Component', () => {
        let comp: TransportistaTablaUpdateComponent;
        let fixture: ComponentFixture<TransportistaTablaUpdateComponent>;
        let service: TransportistaTablaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TransportistaTablaUpdateComponent]
            })
                .overrideTemplate(TransportistaTablaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportistaTablaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportistaTablaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TransportistaTabla(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.transportistaTabla = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TransportistaTabla();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.transportistaTabla = entity;
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
