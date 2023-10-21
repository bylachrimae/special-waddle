import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{
  
  commentsArray : Array<any>;

  constructor(private angularFirestore:AngularFirestore,private commentService:CommentService,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.commentService.loadComments(data.id).subscribe(comment=>{
        this.commentsArray = comment;
      })
    })
  }
}