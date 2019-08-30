/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { VendedoresDetailComponent } from 'app/entities/vendedores/vendedores-detail.component';
import { Vendedores } from 'app/shared/model/vendedores.model';

describe('Component Tests', () => {
    describe('Vendedores Management Detail Component', () => {
        let comp: VendedoresDetailComponent;
        let fixture: ComponentFixture<VendedoresDetailComponent>;
        const route = ({ data: of({ vendedores: new Vendedores(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [VendedoresDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VendedoresDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VendedoresDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vendedores).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
