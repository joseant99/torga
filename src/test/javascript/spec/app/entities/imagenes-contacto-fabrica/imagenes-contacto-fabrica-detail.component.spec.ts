/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ImagenesContactoFabricaDetailComponent } from 'app/entities/imagenes-contacto-fabrica/imagenes-contacto-fabrica-detail.component';
import { ImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';

describe('Component Tests', () => {
    describe('ImagenesContactoFabrica Management Detail Component', () => {
        let comp: ImagenesContactoFabricaDetailComponent;
        let fixture: ComponentFixture<ImagenesContactoFabricaDetailComponent>;
        const route = ({ data: of({ imagenesContactoFabrica: new ImagenesContactoFabrica(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ImagenesContactoFabricaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ImagenesContactoFabricaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImagenesContactoFabricaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.imagenesContactoFabrica).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
