import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThreadService } from '../thread/thread.service';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UnreadMessagesService {
  
  unreadMessagesCounter:Observable<any>;

  constructor(private messageService:MessageService, private threadService: ThreadService) {
    this.unreadMessagesCounter = combineLatest([
      this.threadService.currentThread,
      this.messageService.messages
    ]).pipe(
      map(([currentThread, messages])=>{
      return messages.reduce((sum: number, m: Message)=>{
        const messageIsInCurrentThread: boolean = currentThread.id === m?.thread?.id;
        if(!messageIsInCurrentThread && !m?.isRead) {
          sum += 1;
        }
        return sum;
      }, 0);
    }));
  }
}
