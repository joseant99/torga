/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TiradoresArmarioDetailComponent } from 'app/entities/tiradores-armario/tiradores-armario-detail.component';
import { TiradoresArmario } from 'app/shared/model/tiradores-armario.model';

describe('Component Tests', () => {
    describe('TiradoresArmario Management Detail Component', () => {
        let comp: TiradoresArmarioDetailComponent;
        let fixture: ComponentFixture<TiradoresArmarioDetailComponent>;
        const route = ({ data: of({ tiradoresArmario: new TiradoresArmario(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TiradoresArmarioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TiradoresArmarioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TiradoresArmarioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tiradoresArmario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
