import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { Thread } from './thread.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  threads: Observable<{ [key: string]: Thread }>;


  constructor(public messageService: MessageService) { 

    this.threads = messageService.messages.pipe(
      map((messages: Message[]) => {
        const threads:{ [key: string]: Thread }  = {};

        messages.map((message:Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;
        })

        return threads;
      })
    )
  }
}
