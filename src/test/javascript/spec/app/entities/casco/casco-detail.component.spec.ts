/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { CascoDetailComponent } from 'app/entities/casco/casco-detail.component';
import { Casco } from 'app/shared/model/casco.model';

describe('Component Tests', () => {
    describe('Casco Management Detail Component', () => {
        let comp: CascoDetailComponent;
        let fixture: ComponentFixture<CascoDetailComponent>;
        const route = ({ data: of({ casco: new Casco(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [CascoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CascoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CascoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.casco).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
