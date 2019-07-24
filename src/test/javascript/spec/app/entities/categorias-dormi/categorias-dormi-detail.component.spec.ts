/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CategoriasDormiDetailComponent } from 'app/entities/categorias-dormi/categorias-dormi-detail.component';
import { CategoriasDormi } from 'app/shared/model/categorias-dormi.model';

describe('Component Tests', () => {
    describe('CategoriasDormi Management Detail Component', () => {
        let comp: CategoriasDormiDetailComponent;
        let fixture: ComponentFixture<CategoriasDormiDetailComponent>;
        const route = ({ data: of({ categoriasDormi: new CategoriasDormi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CategoriasDormiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CategoriasDormiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriasDormiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.categoriasDormi).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
