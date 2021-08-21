import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserSettings } from 'src/app/data/user-settings';

@Component({
  selector: 'pm-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  userSettings: UserSettings = {
    name: "Milton",
    emailOffers: true,
    interfaceStyles:"dark",
    subscriptionType: "Annual",
    notes: "here are some notes.."
  };

  constructor() { }

  ngOnInit(): void {
  }

}
