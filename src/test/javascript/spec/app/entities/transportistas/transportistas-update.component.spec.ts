/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TransportistasUpdateComponent } from 'app/entities/transportistas/transportistas-update.component';
import { TransportistasService } from 'app/entities/transportistas/transportistas.service';
import { Transportistas } from 'app/shared/model/transportistas.model';

describe('Component Tests', () => {
    describe('Transportistas Management Update Component', () => {
        let comp: TransportistasUpdateComponent;
        let fixture: ComponentFixture<TransportistasUpdateComponent>;
        let service: TransportistasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TransportistasUpdateComponent]
            })
                .overrideTemplate(TransportistasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportistasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportistasService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Transportistas(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.transportistas = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Transportistas();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.transportistas = entity;
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
