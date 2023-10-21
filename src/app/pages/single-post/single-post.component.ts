import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  postData: any;
  similarPostArray: Array<any>;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.postService.countViews(data.id);
      this.postService.loadOnePost(data.id).subscribe(post => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      })
    })
  }

  loadSimilarPost(categoryId) {
    this.postService.loadSimilar(categoryId).subscribe(data => {
      this.similarPostArray = data;
    })
  }
}
