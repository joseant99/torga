/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { Categorias_DormitorioDetailComponent } from 'app/entities/categorias-dormitorio/categorias-dormitorio-detail.component';
import { Categorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';

describe('Component Tests', () => {
    describe('Categorias_Dormitorio Management Detail Component', () => {
        let comp: Categorias_DormitorioDetailComponent;
        let fixture: ComponentFixture<Categorias_DormitorioDetailComponent>;
        const route = ({ data: of({ categorias_Dormitorio: new Categorias_Dormitorio(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [Categorias_DormitorioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(Categorias_DormitorioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(Categorias_DormitorioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.categorias_Dormitorio).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
