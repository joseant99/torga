/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { IvaProductoTiendaDetailComponent } from 'app/entities/iva-producto-tienda/iva-producto-tienda-detail.component';
import { IvaProductoTienda } from 'app/shared/model/iva-producto-tienda.model';

describe('Component Tests', () => {
    describe('IvaProductoTienda Management Detail Component', () => {
        let comp: IvaProductoTiendaDetailComponent;
        let fixture: ComponentFixture<IvaProductoTiendaDetailComponent>;
        const route = ({ data: of({ ivaProductoTienda: new IvaProductoTienda(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [IvaProductoTiendaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IvaProductoTiendaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IvaProductoTiendaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ivaProductoTienda).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
