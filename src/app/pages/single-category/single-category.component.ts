import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{

  postArray:Array<object>;
  categoryObj:any;
  
  constructor(private activatedRoute:ActivatedRoute,private postService:PostService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.categoryObj = data;
      this.postService.loadCategoryPost(data.id).subscribe(post=>{
        this.postArray = post;
      })
    })
  }
}
