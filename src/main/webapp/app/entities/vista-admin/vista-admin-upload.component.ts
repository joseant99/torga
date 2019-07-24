import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VistaAdminService } from './vista-admin.service';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
    selector: 'jhi-admin-delete-dialog',
    templateUrl: './vista-admin-upload.component.html'
})
export class UploadDialogComponent {
    selectedFilesFactura: FileList;
    selectedFilesConfirmacion: FileList;
    selectedFilesExcel: FileList;
    currentFileUploadFactura: File;
    currentFileUploadConfirmacion: File;
    currentFileUploadExcel: File;
    progressFactura: { percentage: number } = { percentage: 0 };
    progressConfirmacion: { percentage: number } = { percentage: 0 };
    progressExcel: { percentage: number } = { percentage: 0 };
    errormessage: string;

    constructor(
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        protected jhiAlertService: JhiAlertService,
        protected vistaadminService: VistaAdminService
    ) {}

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    selectedFilesFacturas(event) {
        this.selectedFilesFactura = event.target.files;
    }
    selectedFilesConfirmaciones(event) {
        this.selectedFilesConfirmacion = event.target.files;
    }
    selectFileExcel(event) {
        this.selectedFilesExcel = event.target.files;
    }

    uploadFactura() {
        var long = this.selectedFilesFactura.length;
        for (var i = 0; i < long; i++) {
            this.progressFactura.percentage = 0;

            this.currentFileUploadFactura = this.selectedFilesFactura.item(i);
            this.vistaadminService.pushFileToStorageFactura(this.currentFileUploadFactura).subscribe(event => {
                if (i === long) {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressFactura.percentage = Math.round((100 * event.loaded) / event.total);
                    } else if (event instanceof HttpResponse) {
                        console.log('File is completely uploaded!');
                    }
                }
            });
        }

        this.selectedFilesFactura = undefined;
    }

    uploadConfirmacion() {
        var long = this.selectedFilesConfirmacion.length;
        for (var i = 0; i < long; i++) {
            this.progressConfirmacion.percentage = 0;
            this.currentFileUploadConfirmacion = this.selectedFilesConfirmacion.item(i);
            this.vistaadminService.pushFileToStorageConfirmacion(this.selectedFilesConfirmacion.item(i)).subscribe(event => {
                if (i === long) {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressConfirmacion.percentage = Math.round((100 * event.loaded) / event.total);
                    } else if (event instanceof HttpResponse) {
                        console.log('File is completely uploaded!');
                    }
                }
            });
        }

        this.selectedFilesConfirmacion = undefined;
    }

    uploadExcel() {
        this.progressExcel.percentage = 0;

        this.currentFileUploadExcel = this.selectedFilesExcel.item(0);

        this.vistaadminService.pushFileToStorageExcel(this.currentFileUploadExcel).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progressExcel.percentage = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
                this.vistaadminService.pushCSVtoDatabase(this.currentFileUploadExcel.name).subscribe(event => {
                    console.log(this.currentFileUploadExcel.name + ' Insertado pedidos en Base de datos');
                });
            }
        });

        this.selectedFilesExcel = undefined;
    }
}

@Component({
    selector: 'jhi-cliente-delete-popup',
    template: ''
})
export class UploadPopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cliente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UploadDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                //this.ngbModalRef.componentInstance.cliente = cliente;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
