import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount?: number;

  constructor(
    public messageService:MessageService,
    public threadService:ThreadService) { }

  ngOnInit(): void {
    combineLatest([
      this.threadService.currentThread,
      this.messageService.messages
    ]).subscribe(([currentThread, messages])=>{
      this.unreadMessagesCount = messages.reduce((sum: number, m: Message)=>{
        const messageIsInCurrentThread: boolean = currentThread.id === m?.thread?.id;
        if(!messageIsInCurrentThread && !m?.isRead) {
          sum += 1;
        }
        return sum;
      }, 0);
    });
  }

}
