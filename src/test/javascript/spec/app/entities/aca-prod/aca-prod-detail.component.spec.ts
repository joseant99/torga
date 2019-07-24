/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { AcaProdDetailComponent } from 'app/entities/aca-prod/aca-prod-detail.component';
import { AcaProd } from 'app/shared/model/aca-prod.model';

describe('Component Tests', () => {
    describe('AcaProd Management Detail Component', () => {
        let comp: AcaProdDetailComponent;
        let fixture: ComponentFixture<AcaProdDetailComponent>;
        const route = ({ data: of({ acaProd: new AcaProd(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [AcaProdDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AcaProdDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcaProdDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acaProd).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
