/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresenTorgaDetailComponent } from 'app/entities/represen-torga/represen-torga-detail.component';
import { RepresenTorga } from 'app/shared/model/represen-torga.model';

describe('Component Tests', () => {
    describe('RepresenTorga Management Detail Component', () => {
        let comp: RepresenTorgaDetailComponent;
        let fixture: ComponentFixture<RepresenTorgaDetailComponent>;
        const route = ({ data: of({ represenTorga: new RepresenTorga(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresenTorgaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepresenTorgaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepresenTorgaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.represenTorga).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
