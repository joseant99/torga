/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CoordenadasDetailComponent } from 'app/entities/coordenadas/coordenadas-detail.component';
import { Coordenadas } from 'app/shared/model/coordenadas.model';

describe('Component Tests', () => {
    describe('Coordenadas Management Detail Component', () => {
        let comp: CoordenadasDetailComponent;
        let fixture: ComponentFixture<CoordenadasDetailComponent>;
        const route = ({ data: of({ coordenadas: new Coordenadas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CoordenadasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CoordenadasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CoordenadasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.coordenadas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
