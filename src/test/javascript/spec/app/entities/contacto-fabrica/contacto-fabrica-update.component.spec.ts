/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ContactoFabricaUpdateComponent } from 'app/entities/contacto-fabrica/contacto-fabrica-update.component';
import { ContactoFabricaService } from 'app/entities/contacto-fabrica/contacto-fabrica.service';
import { ContactoFabrica } from 'app/shared/model/contacto-fabrica.model';

describe('Component Tests', () => {
    describe('ContactoFabrica Management Update Component', () => {
        let comp: ContactoFabricaUpdateComponent;
        let fixture: ComponentFixture<ContactoFabricaUpdateComponent>;
        let service: ContactoFabricaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ContactoFabricaUpdateComponent]
            })
                .overrideTemplate(ContactoFabricaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactoFabricaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactoFabricaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ContactoFabrica(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.contactoFabrica = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ContactoFabrica();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.contactoFabrica = entity;
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
