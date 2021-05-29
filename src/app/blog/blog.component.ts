import { Component, OnInit } from '@angular/core';
import { blog } from '../blog';
import { BlogDataService } from './blog-data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private _blog: BlogDataService) { }
  blogData: blog[] = [];
  no: number;
  imgpath: string = 'http://localhost:3000/';
  ngOnInit(): void {
    this._blog.getAllBlogData().subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {

        this.blogData = data;
        this.blogData[i].blog_number = i+1;
      }


    });
  }

}
