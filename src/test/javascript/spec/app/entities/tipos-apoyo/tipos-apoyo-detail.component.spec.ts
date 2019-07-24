/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TiposApoyoDetailComponent } from 'app/entities/tipos-apoyo/tipos-apoyo-detail.component';
import { TiposApoyo } from 'app/shared/model/tipos-apoyo.model';

describe('Component Tests', () => {
    describe('TiposApoyo Management Detail Component', () => {
        let comp: TiposApoyoDetailComponent;
        let fixture: ComponentFixture<TiposApoyoDetailComponent>;
        const route = ({ data: of({ tiposApoyo: new TiposApoyo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TiposApoyoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TiposApoyoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TiposApoyoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tiposApoyo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
