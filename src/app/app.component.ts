import { Component } from '@angular/core';

import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];

  // Método responsável por armazenar os dados do post que vem do componente post-create
  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
