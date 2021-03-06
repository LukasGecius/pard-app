import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ListingsPageRoutingModule } from "./listings-routing.module";

import { ListingsPage } from "./listings.page";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ListingsPageRoutingModule
  ],
  declarations: [ListingsPage]
})
export class ListingsPageModule {}
