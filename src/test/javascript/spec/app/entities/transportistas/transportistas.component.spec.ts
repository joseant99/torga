/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TransportistasComponent } from 'app/entities/transportistas/transportistas.component';
import { TransportistasService } from 'app/entities/transportistas/transportistas.service';
import { Transportistas } from 'app/shared/model/transportistas.model';

describe('Component Tests', () => {
    describe('Transportistas Management Component', () => {
        let comp: TransportistasComponent;
        let fixture: ComponentFixture<TransportistasComponent>;
        let service: TransportistasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TransportistasComponent],
                providers: []
            })
                .overrideTemplate(TransportistasComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportistasComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportistasService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Transportistas(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transportistas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
