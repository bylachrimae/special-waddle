import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private angularFirestore:AngularFirestore) { }

  addSubs(subData){
    this.angularFirestore.collection('subscribers').add(subData).then(()=>{
      console.log('Subscriber Saved Successfully');
    })
  }

  checkSubs(subEmail){
    return this.angularFirestore.collection('subscribers',ref => ref.where('email','==',subEmail)).get();
  }
}
