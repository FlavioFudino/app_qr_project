import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { PhotoService } from '../services/photo.service';
import { QrSearchApiService } from '../services/qrsearchapi';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements AfterViewInit {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public percentage = 80;
  public quality = 100;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    public photoService: PhotoService,
    private QrSearchApi: QrSearchApiService
  ) {}

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      // this.handle(this.action, 'start');
    });
  }

  photoTaken: any;
  public takePhoto() {
    this.photoService.takePhoto().then((res) => {
      this.convertImageUrlToBlobUrl(res.webPath)
        .then((blobUrl) => {
          this.photoTaken = blobUrl;
        })
        .catch((error) => {
          console.error('Error converting image URL to blob URL:', error);
        });
    });
  }

  public onSelects(files: any) {
    this.qrcode
      .loadFiles(files, this.percentage, this.quality)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.photoTaken = res[0].url;
        console.log('this.photoTaken', this.photoTaken);
      });
  }

  public onSelects2(files: any) {
    this.qrcode
      .loadFilesToScan(files, this.config, this.percentage, this.quality)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        console.log(res);
        this.qrCodeResult2 = res;
      });
  }

  result: any;
  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // e && action && action.pause();
    this.result = e;

    this.QrSearchApi.validQr(e[0].value);
    console.log('RESULT:', e[0].value);
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onDowload(action: NgxScannerQrcodeComponent) {
    action.download().subscribe(console.log, alert);
  }

  // Función para convertir una URL de imagen a una URL blob
  async convertImageUrlToBlobUrl(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Network response was not ok for URL: ${imageUrl}`);
      }
      const blob: Blob = await response.blob();

      // Crea una URL blob a partir del Blob
      const blobUrl: string = URL.createObjectURL(blob);
      return blobUrl;
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
      throw error;
    }
  }

  public onGetConstraints() {
    const constrains = this.action.getConstraints();
    console.log(constrains);
  }

  public applyConstraints() {
    const constrains = this.action.applyConstraints({
      ...this.action.getConstraints(),
      width: 510,
    });
    console.log(constrains);
  }
}
