/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PrecioFinalPresuService } from 'app/entities/precio-final-presu/precio-final-presu.service';
import { IPrecioFinalPresu, PrecioFinalPresu } from 'app/shared/model/precio-final-presu.model';

describe('Service Tests', () => {
    describe('PrecioFinalPresu Service', () => {
        let injector: TestBed;
        let service: PrecioFinalPresuService;
        let httpMock: HttpTestingController;
        let elemDefault: IPrecioFinalPresu;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PrecioFinalPresuService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new PrecioFinalPresu(0, 'AAAAAAA', 0, 0, 0, 0, 0);
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

            it('should create a PrecioFinalPresu', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new PrecioFinalPresu(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PrecioFinalPresu', async () => {
                const returnedFromService = Object.assign(
                    {
                        precioProds: 'BBBBBB',
                        totalSinIva: 1,
                        iva: 1,
                        totalConIva: 1,
                        descuentoPorcentaje: 1,
                        precioDescuento: 1
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

            it('should return a list of PrecioFinalPresu', async () => {
                const returnedFromService = Object.assign(
                    {
                        precioProds: 'BBBBBB',
                        totalSinIva: 1,
                        iva: 1,
                        totalConIva: 1,
                        descuentoPorcentaje: 1,
                        precioDescuento: 1
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

            it('should delete a PrecioFinalPresu', async () => {
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
