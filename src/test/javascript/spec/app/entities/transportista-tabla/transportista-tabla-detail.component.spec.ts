/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TransportistaTablaDetailComponent } from 'app/entities/transportista-tabla/transportista-tabla-detail.component';
import { TransportistaTabla } from 'app/shared/model/transportista-tabla.model';

describe('Component Tests', () => {
    describe('TransportistaTabla Management Detail Component', () => {
        let comp: TransportistaTablaDetailComponent;
        let fixture: ComponentFixture<TransportistaTablaDetailComponent>;
        const route = ({ data: of({ transportistaTabla: new TransportistaTabla(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TransportistaTablaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportistaTablaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportistaTablaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportistaTabla).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
