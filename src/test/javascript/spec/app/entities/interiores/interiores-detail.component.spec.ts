/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresDetailComponent } from 'app/entities/interiores/interiores-detail.component';
import { Interiores } from 'app/shared/model/interiores.model';

describe('Component Tests', () => {
    describe('Interiores Management Detail Component', () => {
        let comp: InterioresDetailComponent;
        let fixture: ComponentFixture<InterioresDetailComponent>;
        const route = ({ data: of({ interiores: new Interiores(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InterioresDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InterioresDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.interiores).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
