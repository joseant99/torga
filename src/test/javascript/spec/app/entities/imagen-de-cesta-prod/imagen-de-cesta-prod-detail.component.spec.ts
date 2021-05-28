/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ImagenDeCestaProdDetailComponent } from 'app/entities/imagen-de-cesta-prod/imagen-de-cesta-prod-detail.component';
import { ImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';

describe('Component Tests', () => {
    describe('ImagenDeCestaProd Management Detail Component', () => {
        let comp: ImagenDeCestaProdDetailComponent;
        let fixture: ComponentFixture<ImagenDeCestaProdDetailComponent>;
        const route = ({ data: of({ imagenDeCestaProd: new ImagenDeCestaProd(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ImagenDeCestaProdDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ImagenDeCestaProdDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImagenDeCestaProdDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.imagenDeCestaProd).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
