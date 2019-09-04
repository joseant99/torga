/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { MedidasEspecialesDetailComponent } from 'app/entities/medidas-especiales/medidas-especiales-detail.component';
import { MedidasEspeciales } from 'app/shared/model/medidas-especiales.model';

describe('Component Tests', () => {
    describe('MedidasEspeciales Management Detail Component', () => {
        let comp: MedidasEspecialesDetailComponent;
        let fixture: ComponentFixture<MedidasEspecialesDetailComponent>;
        const route = ({ data: of({ medidasEspeciales: new MedidasEspeciales(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [MedidasEspecialesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedidasEspecialesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedidasEspecialesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medidasEspeciales).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
