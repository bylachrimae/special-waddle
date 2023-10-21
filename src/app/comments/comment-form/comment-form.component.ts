import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  parameterPostId:string;
  commentForm : FormGroup;
  isSent: boolean = false;

  constructor(private commentService:CommentService,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(parameter=>{
      this.parameterPostId = parameter.id
    })
    this.commentForm = formBuilder.group({
      name : ['',Validators.required],
      comment : ['',Validators.required],
      postId : this.parameterPostId
    })
  }

  get commentFormContent(){
    return this.commentForm.controls;
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    const commentData: Comment ={
      name: this.commentForm.value.name,
      comment : this.commentForm.value.comment,
      postedAt : new Date(),
      postId : this.parameterPostId
    }
    this.commentService.addComment(commentData);
    this.commentForm.reset();
    this.isSent = true;
  }
}
