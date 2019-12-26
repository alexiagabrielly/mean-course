import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() {}
  enteredTitle = '';
  enteredContent = '';
  // Output responsável por fazer o angular entender que o postCreated é um evento que pode ser escutado do lado de fora
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    // emit responsável por enviar as informações do post quando o evneto acontecer
    this.postCreated.emit(post);
  }

  ngOnInit() {
  }

}
