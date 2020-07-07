/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { UsbDetailComponent } from 'app/entities/usb/usb-detail.component';
import { Usb } from 'app/shared/model/usb.model';

describe('Component Tests', () => {
    describe('Usb Management Detail Component', () => {
        let comp: UsbDetailComponent;
        let fixture: ComponentFixture<UsbDetailComponent>;
        const route = ({ data: of({ usb: new Usb(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [UsbDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UsbDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsbDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.usb).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
