import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  constructor(private subService: SubscribersService) { }

  ngOnInit(): void {

  }

  onSubmit(formData) {
    const subData: Sub = {
      name: formData.name,
      email: formData.email
    }
    //this.subService.addSubs(subData);

    //Preventing email dublication
    this.subService.checkSubs(subData.email).subscribe(data => {
      console.log(data);

      if (data.empty) {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      }
      else {
        this.isEmailError = true;
      }
    })
  }
}
