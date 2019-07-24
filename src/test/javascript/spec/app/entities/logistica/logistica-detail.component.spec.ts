/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { LogisticaDetailComponent } from 'app/entities/logistica/logistica-detail.component';
import { Logistica } from 'app/shared/model/logistica.model';

describe('Component Tests', () => {
    describe('Logistica Management Detail Component', () => {
        let comp: LogisticaDetailComponent;
        let fixture: ComponentFixture<LogisticaDetailComponent>;
        const route = ({ data: of({ logistica: new Logistica(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [LogisticaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LogisticaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LogisticaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.logistica).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
