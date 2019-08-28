import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { IluminacionService } from '../iluminacion/iluminacion.service';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { CategoriasDormiService } from 'app/entities/categorias-dormi';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-productos-dormitorio-update',
    templateUrl: './productos-dormitorio-update.component.html'
})
export class ProductosDormitorioUpdateComponent implements OnInit, AfterViewInit {
    productosDormitorio: IProductosDormitorio;
    isSaving: boolean;
    iluminacion: any;
    id: any;
    productosDormitorio1: any;

    categoriasdormis: ICategoriasDormi[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected iluminacionService: IluminacionService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected categoriasDormiService: CategoriasDormiService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        var ilu = [];
        var prod = [];
        this.activatedRoute.data.subscribe(({ productosDormitorio }) => {
            this.productosDormitorio = productosDormitorio;
        });
        this.categoriasDormiService.query().subscribe(
            (res: HttpResponse<ICategoriasDormi[]>) => {
                this.categoriasdormis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.iluminacionService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    ilu[i] = data['body'][i];
                }
            });
        this.iluminacion = ilu;

        this.productosDormitorioService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    prod[index] = value;
                });
            });
        this.productosDormitorio1 = prod;
        var tamaño = this.productosDormitorio1.length;
        if (this.productosDormitorio1['tamaño'] != undefined) {
            this.id = this.productosDormitorio1['tamaño']['id'];
        }
    }
    AfterViewInit() {
        var tamaño = this.productosDormitorio1.length;
        this.id = this.productosDormitorio1['tamaño']['id'];
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.productosDormitorio, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productosDormitorio.id !== undefined) {
            this.subscribeToSaveResponse(this.productosDormitorioService.update(this.productosDormitorio));
        } else {
            this.subscribeToSaveResponse(this.productosDormitorioService.create(this.productosDormitorio));
            var precio1 = $('#field_precio').val();
            if (precio1 != 0 && precio1 != '' && precio1 != undefined) {
                var tamaño = this.productosDormitorio1.length;
                if (this.productosDormitorio1[tamaño - 1] != undefined) {
                    this.id = this.productosDormitorio1[tamaño - 1]['id'];
                }
                var producto = this.productosDormitorio;
                producto['id'] = this.id + 1;
                const iluminacionProd = {
                    productosDormitorio: producto,
                    precio: precio1
                };
                this.subscribeToSaveResponse(this.iluminacionService.create(iluminacionProd));
            }
        }
    }
    public meterPrecio() {
        $('#iluminacion').append('<p>Introduce el precio de la iluminacion en este producto</p>');
        $('#iluminacion').append('<input type="number" class="form-control" name="precio" id="field_precio" required/>');
    }
    protected subscribeToSaveResponse1(result: Observable<HttpResponse<IIluminacion>>) {
        result.subscribe((res: HttpResponse<IIluminacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductosDormitorio>>) {
        result.subscribe((res: HttpResponse<IProductosDormitorio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCategoriasDormiById(index: number, item: ICategoriasDormi) {
        return item.id;
    }
}
