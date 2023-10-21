import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredPostArray: Array<object>;
  latestPostArray: Array<object>;

  constructor(private postService:PostService) {}

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(data=>{
      this.featuredPostArray = data;
    })

    this.postService.loadLatest().subscribe(data=>{
      this.latestPostArray = data;
    })
}
}
