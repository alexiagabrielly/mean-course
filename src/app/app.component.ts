import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts = [];

  // Método responsável por armazenar os dados do post que vem do componente post-create
  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
