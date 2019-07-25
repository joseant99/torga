/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DatosUsuarioService } from 'app/entities/datos-usuario/datos-usuario.service';
import { IDatosUsuario, DatosUsuario } from 'app/shared/model/datos-usuario.model';

describe('Service Tests', () => {
    describe('DatosUsuario Service', () => {
        let injector: TestBed;
        let service: DatosUsuarioService;
        let httpMock: HttpTestingController;
        let elemDefault: IDatosUsuario;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DatosUsuarioService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new DatosUsuario(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
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

            it('should create a DatosUsuario', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new DatosUsuario(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DatosUsuario', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombreCompleto: 'BBBBBB',
                        email: 'BBBBBB',
                        telefono: 'BBBBBB',
                        nombreComercial: 'BBBBBB',
                        direccion: 'BBBBBB',
                        codPostal: 'BBBBBB',
                        logo: 'BBBBBB',
                        cif: 'BBBBBB',
                        nombreFiscal: 'BBBBBB'
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

            it('should return a list of DatosUsuario', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombreCompleto: 'BBBBBB',
                        email: 'BBBBBB',
                        telefono: 'BBBBBB',
                        nombreComercial: 'BBBBBB',
                        direccion: 'BBBBBB',
                        codPostal: 'BBBBBB',
                        logo: 'BBBBBB',
                        cif: 'BBBBBB',
                        nombreFiscal: 'BBBBBB'
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

            it('should delete a DatosUsuario', async () => {
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
