/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DatosClienteService } from 'app/entities/datos-cliente/datos-cliente.service';
import { IDatosCliente, DatosCliente } from 'app/shared/model/datos-cliente.model';

describe('Service Tests', () => {
    describe('DatosCliente Service', () => {
        let injector: TestBed;
        let service: DatosClienteService;
        let httpMock: HttpTestingController;
        let elemDefault: IDatosCliente;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DatosClienteService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new DatosCliente(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
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

            it('should create a DatosCliente', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new DatosCliente(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DatosCliente', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        correo: 'BBBBBB',
                        telefono: 'BBBBBB',
                        direccion: 'BBBBBB',
                        codigoPostal: 'BBBBBB',
                        fines: 'BBBBBB',
                        enviar: 'BBBBBB'
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

            it('should return a list of DatosCliente', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        correo: 'BBBBBB',
                        telefono: 'BBBBBB',
                        direccion: 'BBBBBB',
                        codigoPostal: 'BBBBBB',
                        fines: 'BBBBBB',
                        enviar: 'BBBBBB'
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

            it('should delete a DatosCliente', async () => {
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
