import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() {}

  // Output responsável por fazer o angular entender que o postCreated é um evento que pode ser escutado do lado de fora
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if (form.invalid) return;
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    // emit responsável por enviar as informações do post quando o evneto acontecer
    this.postCreated.emit(post);
  }

  ngOnInit() {
  }

}
