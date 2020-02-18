import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  wordForm: FormGroup;
  item;

  constructor(
      private  authService: AuthService,
      private  router: Router,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.wordForm = this.formBuilder.group({
      WordItem: ['', Validators.required]
    });
  }

  onSubmit() {
    const base = 'https://api.nutritionix.com/v1_1/search/';
    const food = this.f.FoodItem.value + '?results=0:1&fields=*';
    const appID = '&appId=45876827';
    const apiKey = '&appKey=5e64cf8b4630c5929e1c40949be9290e';
    this.http.get(base + food + appID + apiKey)
        .subscribe((data: any) => this.item = {
          name: data.hits[0].fields.item_name,
          calories:  data.hits[0].fields.nf_calories,
          weight: data.hits[0].fields.nf_serving_weight_grams
        });
  }


  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
