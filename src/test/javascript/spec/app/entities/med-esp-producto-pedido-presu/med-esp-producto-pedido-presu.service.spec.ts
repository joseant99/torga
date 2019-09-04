/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MedEspProductoPedidoPresuService } from 'app/entities/med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IMedEspProductoPedidoPresu, MedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';

describe('Service Tests', () => {
    describe('MedEspProductoPedidoPresu Service', () => {
        let injector: TestBed;
        let service: MedEspProductoPedidoPresuService;
        let httpMock: HttpTestingController;
        let elemDefault: IMedEspProductoPedidoPresu;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MedEspProductoPedidoPresuService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new MedEspProductoPedidoPresu(0, 0, 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a MedEspProductoPedidoPresu', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new MedEspProductoPedidoPresu(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MedEspProductoPedidoPresu', async () => {
                const returnedFromService = Object.assign(
                    {
                        ancho: 1,
                        fondo: 1,
                        alto: 1,
                        precio: 1
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of MedEspProductoPedidoPresu', async () => {
                const returnedFromService = Object.assign(
                    {
                        ancho: 1,
                        fondo: 1,
                        alto: 1,
                        precio: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a MedEspProductoPedidoPresu', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
