/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { UsbUpdateComponent } from 'app/entities/usb/usb-update.component';
import { UsbService } from 'app/entities/usb/usb.service';
import { Usb } from 'app/shared/model/usb.model';

describe('Component Tests', () => {
    describe('Usb Management Update Component', () => {
        let comp: UsbUpdateComponent;
        let fixture: ComponentFixture<UsbUpdateComponent>;
        let service: UsbService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [UsbUpdateComponent]
            })
                .overrideTemplate(UsbUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsbUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsbService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Usb(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.usb = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Usb();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.usb = entity;
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
