/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { RepreGCompraService } from 'app/entities/repre-g-compra/repre-g-compra.service';
import { IRepreGCompra, RepreGCompra } from 'app/shared/model/repre-g-compra.model';

describe('Service Tests', () => {
    describe('RepreGCompra Service', () => {
        let injector: TestBed;
        let service: RepreGCompraService;
        let httpMock: HttpTestingController;
        let elemDefault: IRepreGCompra;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RepreGCompraService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new RepreGCompra(
                0,
                'AAAAAAA',
                'AAAAAAA',
                false,
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                'AAAAAAA',
                false,
                false,
                0,
                0,
                'AAAAAAA',
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                0,
                'AAAAAAA',
                0
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

            it('should create a RepreGCompra', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new RepreGCompra(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a RepreGCompra', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        cif: 'BBBBBB',
                        activo: true,
                        fAlta: 'BBBBBB',
                        fBaja: 'BBBBBB',
                        comision: 1,
                        dto1: 1,
                        com1: 1,
                        dto2: 1,
                        com2: 1,
                        dto3: 1,
                        com3: 1,
                        dto4: 1,
                        com4: 1,
                        dto5: 1,
                        com5: 1,
                        dtoGrupo: 1,
                        ctaContable: 1,
                        observaciones: 'BBBBBB',
                        apIva: true,
                        apReq: true,
                        tipoIva: 1,
                        retencion: 1,
                        direccion: 'BBBBBB',
                        cp: 1,
                        poblacion: 'BBBBBB',
                        provincia: 'BBBBBB',
                        zona: 'BBBBBB',
                        tipo: 'BBBBBB',
                        email: 'BBBBBB',
                        web: 'BBBBBB',
                        objetivos: 1,
                        fijo: 1,
                        movil: 1,
                        fax: 'BBBBBB',
                        codigo: 1
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

            it('should return a list of RepreGCompra', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        cif: 'BBBBBB',
                        activo: true,
                        fAlta: 'BBBBBB',
                        fBaja: 'BBBBBB',
                        comision: 1,
                        dto1: 1,
                        com1: 1,
                        dto2: 1,
                        com2: 1,
                        dto3: 1,
                        com3: 1,
                        dto4: 1,
                        com4: 1,
                        dto5: 1,
                        com5: 1,
                        dtoGrupo: 1,
                        ctaContable: 1,
                        observaciones: 'BBBBBB',
                        apIva: true,
                        apReq: true,
                        tipoIva: 1,
                        retencion: 1,
                        direccion: 'BBBBBB',
                        cp: 1,
                        poblacion: 'BBBBBB',
                        provincia: 'BBBBBB',
                        zona: 'BBBBBB',
                        tipo: 'BBBBBB',
                        email: 'BBBBBB',
                        web: 'BBBBBB',
                        objetivos: 1,
                        fijo: 1,
                        movil: 1,
                        fax: 'BBBBBB',
                        codigo: 1
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

            it('should delete a RepreGCompra', async () => {
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
