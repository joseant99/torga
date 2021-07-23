/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { InteriorArmarioMedidaService } from 'app/entities/interior-armario-medida/interior-armario-medida.service';
import { IInteriorArmarioMedida, InteriorArmarioMedida } from 'app/shared/model/interior-armario-medida.model';

describe('Service Tests', () => {
    describe('InteriorArmarioMedida Service', () => {
        let injector: TestBed;
        let service: InteriorArmarioMedidaService;
        let httpMock: HttpTestingController;
        let elemDefault: IInteriorArmarioMedida;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(InteriorArmarioMedidaService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new InteriorArmarioMedida(
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
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
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

            it('should create a InteriorArmarioMedida', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new InteriorArmarioMedida(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a InteriorArmarioMedida', async () => {
                const returnedFromService = Object.assign(
                    {
                        numeroHueco: 1,
                        est1: 1,
                        est2: 1,
                        est3: 1,
                        est4: 1,
                        est5: 1,
                        est6: 1,
                        est7: 1,
                        est8: 1,
                        est9: 1,
                        est10: 1,
                        tubo1: 1,
                        tubo2: 1,
                        tubo3: 1,
                        cajSue1: 1,
                        cajSue2: 1,
                        cajSue3: 1,
                        cajSue4: 1,
                        cajSue5: 1,
                        hang: 1,
                        camisero: 1,
                        estCris1: 1,
                        estCris2: 1,
                        estCris3: 1,
                        estCris4: 1,
                        estCris5: 1,
                        estCris6: 1,
                        estCris7: 1,
                        estCris8: 1,
                        estCris9: 1,
                        estCris10: 1,
                        cajonVol1: 1,
                        cajonVol2: 1,
                        cajonVol3: 1
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

            it('should return a list of InteriorArmarioMedida', async () => {
                const returnedFromService = Object.assign(
                    {
                        numeroHueco: 1,
                        est1: 1,
                        est2: 1,
                        est3: 1,
                        est4: 1,
                        est5: 1,
                        est6: 1,
                        est7: 1,
                        est8: 1,
                        est9: 1,
                        est10: 1,
                        tubo1: 1,
                        tubo2: 1,
                        tubo3: 1,
                        cajSue1: 1,
                        cajSue2: 1,
                        cajSue3: 1,
                        cajSue4: 1,
                        cajSue5: 1,
                        hang: 1,
                        camisero: 1,
                        estCris1: 1,
                        estCris2: 1,
                        estCris3: 1,
                        estCris4: 1,
                        estCris5: 1,
                        estCris6: 1,
                        estCris7: 1,
                        estCris8: 1,
                        estCris9: 1,
                        estCris10: 1,
                        cajonVol1: 1,
                        cajonVol2: 1,
                        cajonVol3: 1
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

            it('should delete a InteriorArmarioMedida', async () => {
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
