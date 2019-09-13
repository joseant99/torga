/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { InterioresArmariosDetailComponent } from 'app/entities/interiores-armarios/interiores-armarios-detail.component';
import { InterioresArmarios } from 'app/shared/model/interiores-armarios.model';

describe('Component Tests', () => {
    describe('InterioresArmarios Management Detail Component', () => {
        let comp: InterioresArmariosDetailComponent;
        let fixture: ComponentFixture<InterioresArmariosDetailComponent>;
        const route = ({ data: of({ interioresArmarios: new InterioresArmarios(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [InterioresArmariosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InterioresArmariosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InterioresArmariosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.interioresArmarios).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
