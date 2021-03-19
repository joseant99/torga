/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ExposicionDetailComponent } from 'app/entities/exposicion/exposicion-detail.component';
import { Exposicion } from 'app/shared/model/exposicion.model';

describe('Component Tests', () => {
    describe('Exposicion Management Detail Component', () => {
        let comp: ExposicionDetailComponent;
        let fixture: ComponentFixture<ExposicionDetailComponent>;
        const route = ({ data: of({ exposicion: new Exposicion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ExposicionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExposicionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExposicionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.exposicion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
