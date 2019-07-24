/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PresupuestoPedidoService } from 'app/entities/presupuesto-pedido/presupuesto-pedido.service';
import { IPresupuestoPedido, PresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';

describe('Service Tests', () => {
    describe('PresupuestoPedido Service', () => {
        let injector: TestBed;
        let service: PresupuestoPedidoService;
        let httpMock: HttpTestingController;
        let elemDefault: IPresupuestoPedido;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PresupuestoPedidoService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new PresupuestoPedido(0, 'AAAAAAA', 0, 'AAAAAAA', 'AAAAAAA');
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

            it('should create a PresupuestoPedido', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new PresupuestoPedido(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PresupuestoPedido', async () => {
                const returnedFromService = Object.assign(
                    {
                        codigo: 'BBBBBB',
                        pedido: 1,
                        fecha_presupuesto: 'BBBBBB',
                        fecha_pedido: 'BBBBBB'
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

            it('should return a list of PresupuestoPedido', async () => {
                const returnedFromService = Object.assign(
                    {
                        codigo: 'BBBBBB',
                        pedido: 1,
                        fecha_presupuesto: 'BBBBBB',
                        fecha_pedido: 'BBBBBB'
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

            it('should delete a PresupuestoPedido', async () => {
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
