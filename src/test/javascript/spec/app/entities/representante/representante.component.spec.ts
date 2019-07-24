/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TorgaPedidosTestModule } from '../../../test.module';
import { RepresentanteComponent } from 'app/entities/representante/representante.component';
import { RepresentanteService } from 'app/entities/representante/representante.service';
import { Representante } from 'app/shared/model/representante.model';

describe('Component Tests', () => {
    describe('Representante Management Component', () => {
        let comp: RepresentanteComponent;
        let fixture: ComponentFixture<RepresentanteComponent>;
        let service: RepresentanteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [RepresentanteComponent],
                providers: []
            })
                .overrideTemplate(RepresentanteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepresentanteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepresentanteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Representante(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.representantes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
