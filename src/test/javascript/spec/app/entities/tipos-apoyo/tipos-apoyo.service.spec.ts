/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { TiposApoyoService } from 'app/entities/tipos-apoyo/tipos-apoyo.service';
import { ITiposApoyo, TiposApoyo } from 'app/shared/model/tipos-apoyo.model';

describe('Service Tests', () => {
    describe('TiposApoyo Service', () => {
        let injector: TestBed;
        let service: TiposApoyoService;
        let httpMock: HttpTestingController;
        let elemDefault: ITiposApoyo;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TiposApoyoService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new TiposApoyo(0, 'AAAAAAA', 'image/png', 'AAAAAAA', 0, 0, 0, 0);
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

            it('should create a TiposApoyo', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new TiposApoyo(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a TiposApoyo', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        imagen: 'BBBBBB',
                        precio: 1,
                        altura: 1,
                        ancho: 1,
                        fondo: 1
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

            it('should return a list of TiposApoyo', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        imagen: 'BBBBBB',
                        precio: 1,
                        altura: 1,
                        ancho: 1,
                        fondo: 1
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

            it('should delete a TiposApoyo', async () => {
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
