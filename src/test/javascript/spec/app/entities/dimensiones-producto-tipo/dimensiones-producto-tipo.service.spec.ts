/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DimensionesProductoTipoService } from 'app/entities/dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { IDimensionesProductoTipo, DimensionesProductoTipo } from 'app/shared/model/dimensiones-producto-tipo.model';

describe('Service Tests', () => {
    describe('DimensionesProductoTipo Service', () => {
        let injector: TestBed;
        let service: DimensionesProductoTipoService;
        let httpMock: HttpTestingController;
        let elemDefault: IDimensionesProductoTipo;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DimensionesProductoTipoService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new DimensionesProductoTipo(0, 0, 0, 0, 'AAAAAAA', 'image/png', 'AAAAAAA', 0, 'AAAAAAA');
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

            it('should create a DimensionesProductoTipo', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new DimensionesProductoTipo(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DimensionesProductoTipo', async () => {
                const returnedFromService = Object.assign(
                    {
                        ancho: 1,
                        alto: 1,
                        fondo: 1,
                        mensaje: 'BBBBBB',
                        imagen: 'BBBBBB',
                        precio: 1,
                        anchoMesitaIdeal: 'BBBBBB'
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

            it('should return a list of DimensionesProductoTipo', async () => {
                const returnedFromService = Object.assign(
                    {
                        ancho: 1,
                        alto: 1,
                        fondo: 1,
                        mensaje: 'BBBBBB',
                        imagen: 'BBBBBB',
                        precio: 1,
                        anchoMesitaIdeal: 'BBBBBB'
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

            it('should delete a DimensionesProductoTipo', async () => {
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
