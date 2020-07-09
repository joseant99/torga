/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PuertasPreciosService } from 'app/entities/puertas-precios/puertas-precios.service';
import { IPuertasPrecios, PuertasPrecios } from 'app/shared/model/puertas-precios.model';

describe('Service Tests', () => {
    describe('PuertasPrecios Service', () => {
        let injector: TestBed;
        let service: PuertasPreciosService;
        let httpMock: HttpTestingController;
        let elemDefault: IPuertasPrecios;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PuertasPreciosService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new PuertasPrecios(0, 0, 0, 0, 'AAAAAAA', 0, 0, 0, 0, 0, 0, 0, 0);
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

            it('should create a PuertasPrecios', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new PuertasPrecios(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PuertasPrecios', async () => {
                const returnedFromService = Object.assign(
                    {
                        ancho: 1,
                        alto: 1,
                        precio: 1,
                        tipo: 'BBBBBB',
                        puerta1: 1,
                        puerta2: 1,
                        puerta3: 1,
                        puerta4: 1,
                        puerta5: 1,
                        puerta6: 1,
                        puerta7: 1,
                        puerta8: 1
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

            it('should return a list of PuertasPrecios', async () => {
                const returnedFromService = Object.assign(
                    {
                        ancho: 1,
                        alto: 1,
                        precio: 1,
                        tipo: 'BBBBBB',
                        puerta1: 1,
                        puerta2: 1,
                        puerta3: 1,
                        puerta4: 1,
                        puerta5: 1,
                        puerta6: 1,
                        puerta7: 1,
                        puerta8: 1
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

            it('should delete a PuertasPrecios', async () => {
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
