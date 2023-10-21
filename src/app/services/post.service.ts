import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore:AngularFirestore) { }

  loadFeatured(){
    return this.angularFirestore.collection('posts', ref=>ref.where('isFeatured','==',true).limit(4)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }

  loadLatest(){
    return this.angularFirestore.collection('posts',ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }

  loadCategoryPost(categoryId){
    return this.angularFirestore.collection('posts', ref=>ref.where('category.categoryId','==',categoryId).limit(4)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }
  
  loadOnePost(postId){
    return this.angularFirestore.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilar(categoryId){
    return this.angularFirestore.collection('posts', ref=>ref.where('category.categoryId','==',categoryId).limit(4)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }

  countViews(postId){
    const viewsCount ={
      views: firebase.default.firestore.FieldValue.increment(1)
    }
    this.angularFirestore.doc(`posts/${postId}`).update(viewsCount).then(()=>{
      console.log('Views Count Updated!');
    })
  }
}
