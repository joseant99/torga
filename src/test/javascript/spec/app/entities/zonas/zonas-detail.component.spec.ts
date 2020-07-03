/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ZonasDetailComponent } from 'app/entities/zonas/zonas-detail.component';
import { Zonas } from 'app/shared/model/zonas.model';

describe('Component Tests', () => {
    describe('Zonas Management Detail Component', () => {
        let comp: ZonasDetailComponent;
        let fixture: ComponentFixture<ZonasDetailComponent>;
        const route = ({ data: of({ zonas: new Zonas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ZonasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ZonasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZonasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.zonas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
