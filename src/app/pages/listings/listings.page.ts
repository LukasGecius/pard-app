import { Component, OnInit } from "@angular/core";
import { PhotoService } from "../../features/services/photo.service";
import { DataService } from "../../features/services/data.service";
import { ListingModel } from "src/app/features/models/listing.model";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.page.html",
  styleUrls: ["./listings.page.scss"]
})
export class ListingsPage implements OnInit {
  constructor(
    public photoService: PhotoService,
    private data: DataService,
    private alertController: AlertController,
    private translate: TranslateService
  ) {}
  listings: Observable<Array<ListingModel>>;
  public view: boolean = true;

  ngOnInit() {
    this.listings = this.data.getMyListings();
  }

  async deleteListing(listing: ListingModel) {
    await this.data.deleteListing(listing);
  }
  async publishListing(listing: ListingModel, action: boolean) {
    await this.data.publishListing(listing, action);
  }

  async editListing(listing: ListingModel) {
    const alert = await this.alertController.create({
      header: this.translate.instant("EDIT_LISTING"),
      inputs: [
        {
          name: "title",
          type: "text",
          id: "title",
          placeholder: this.translate.instant("TITLE"),
          value: listing.title
        },
        {
          name: "description",
          type: "text",
          id: "description",
          placeholder: this.translate.instant("DESCRIPTION"),
          value: listing.description
        },
        {
          name: "price",
          type: "number",
          id: "price",
          placeholder: this.translate.instant("PRICE"),
          value: listing.price,
          min: 0
        },
        {
          name: "stock",
          type: "number",
          id: "stock",
          placeholder: this.translate.instant("STOCK"),
          value: listing.stock,
          min: 0
        }
      ],
      buttons: [
        {
          text: this.translate.instant("CANCEL"),
          role: "cancel",
          cssClass: "secondary",
          handler: () => {}
        },
        {
          text: this.translate.instant("SAVE"),
          handler: res => {
            this.data.updateListing(listing, res);
          }
        }
      ]
    });

    await alert.present();
  }
}
