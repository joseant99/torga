/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MensajesDetailComponent } from 'app/entities/mensajes/mensajes-detail.component';
import { Mensajes } from 'app/shared/model/mensajes.model';

describe('Component Tests', () => {
    describe('Mensajes Management Detail Component', () => {
        let comp: MensajesDetailComponent;
        let fixture: ComponentFixture<MensajesDetailComponent>;
        const route = ({ data: of({ mensajes: new Mensajes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MensajesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MensajesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MensajesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mensajes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
