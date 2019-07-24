/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TransportistasDetailComponent } from 'app/entities/transportistas/transportistas-detail.component';
import { Transportistas } from 'app/shared/model/transportistas.model';

describe('Component Tests', () => {
    describe('Transportistas Management Detail Component', () => {
        let comp: TransportistasDetailComponent;
        let fixture: ComponentFixture<TransportistasDetailComponent>;
        const route = ({ data: of({ transportistas: new Transportistas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TransportistasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportistasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportistasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportistas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
