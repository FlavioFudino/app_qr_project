import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { SafePipe } from '../safe.pipe';


// Necessary to solve the problem of losing internet connection
LOAD_WASM().subscribe()

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    NgxScannerQrcodeModule
  ],
  declarations: [Tab3Page,SafePipe]
})
export class Tab3PageModule {}
