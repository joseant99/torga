/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ComposicionDetailComponent } from 'app/entities/composicion/composicion-detail.component';
import { Composicion } from 'app/shared/model/composicion.model';

describe('Component Tests', () => {
    describe('Composicion Management Detail Component', () => {
        let comp: ComposicionDetailComponent;
        let fixture: ComponentFixture<ComposicionDetailComponent>;
        const route = ({ data: of({ composicion: new Composicion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ComposicionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ComposicionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComposicionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.composicion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
