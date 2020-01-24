/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { DireccionTiendasDetailComponent } from 'app/entities/direccion-tiendas/direccion-tiendas-detail.component';
import { DireccionTiendas } from 'app/shared/model/direccion-tiendas.model';

describe('Component Tests', () => {
    describe('DireccionTiendas Management Detail Component', () => {
        let comp: DireccionTiendasDetailComponent;
        let fixture: ComponentFixture<DireccionTiendasDetailComponent>;
        const route = ({ data: of({ direccionTiendas: new DireccionTiendas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [DireccionTiendasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DireccionTiendasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DireccionTiendasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.direccionTiendas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
