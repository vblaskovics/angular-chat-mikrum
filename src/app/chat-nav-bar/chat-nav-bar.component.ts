import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { UnreadMessagesService } from '../message/unread-messages.service';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCounter?: Observable<any>;

  constructor(
    public unreadMessageService:UnreadMessagesService) {
      this.unreadMessagesCounter = this.unreadMessageService.unreadMessagesCounter;
    }

  ngOnInit(): void {
    // combineLatest([
    //   this.threadService.currentThread,
    //   this.messageService.messages
    // ]).subscribe(([currentThread, messages])=>{
    //   this.unreadMessagesCount = messages.reduce((sum: number, m: Message)=>{
    //     const messageIsInCurrentThread: boolean = currentThread.id === m?.thread?.id;
    //     if(!messageIsInCurrentThread && !m?.isRead) {
    //       sum += 1;
    //     }
    //     return sum;
    //   }, 0);
    // });
  }

}
