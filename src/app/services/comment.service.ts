import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private angularFirestore:AngularFirestore) {

   }

  addComment(commentData){
    this.angularFirestore.collection('comments').add(commentData).then(docRef=>{
      console.log('Comment Saved Successfully');
    })
  }

  loadComments(postId){
    return this.angularFirestore.collection('comments',ref=>ref.where('postId','==',postId)).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }
}
