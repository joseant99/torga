/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { ArmarioDetailComponent } from 'app/entities/armario/armario-detail.component';
import { Armario } from 'app/shared/model/armario.model';

describe('Component Tests', () => {
    describe('Armario Management Detail Component', () => {
        let comp: ArmarioDetailComponent;
        let fixture: ComponentFixture<ArmarioDetailComponent>;
        const route = ({ data: of({ armario: new Armario(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [ArmarioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ArmarioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArmarioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.armario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
