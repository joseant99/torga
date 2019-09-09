/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ContactoFabricaDetailComponent } from 'app/entities/contacto-fabrica/contacto-fabrica-detail.component';
import { ContactoFabrica } from 'app/shared/model/contacto-fabrica.model';

describe('Component Tests', () => {
    describe('ContactoFabrica Management Detail Component', () => {
        let comp: ContactoFabricaDetailComponent;
        let fixture: ComponentFixture<ContactoFabricaDetailComponent>;
        const route = ({ data: of({ contactoFabrica: new ContactoFabrica(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ContactoFabricaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContactoFabricaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactoFabricaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contactoFabrica).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
