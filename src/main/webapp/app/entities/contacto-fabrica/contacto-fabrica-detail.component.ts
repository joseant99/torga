import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';

@Component({
    selector: 'jhi-contacto-fabrica-detail',
    templateUrl: './contacto-fabrica-detail.component.html'
})
export class ContactoFabricaDetailComponent implements OnInit {
    contactoFabrica: IContactoFabrica;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactoFabrica }) => {
            this.contactoFabrica = contactoFabrica;
        });
    }

    previousState() {
        window.history.back();
    }
}
