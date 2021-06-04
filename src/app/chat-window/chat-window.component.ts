import { Component, ElementRef, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/thread.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  currentUser: User;
  draftMessage: Message;

  constructor(public messageService: MessageService,
      public threadService: ThreadService,
      public userService: UserService,
      public el: ElementRef) { 
        this.currentThread = new Thread();
        this.currentUser = new User();
        this.draftMessage = new Message();

        this.messages = this.threadService.currentThreadMessages;

        this.threadService.currentThread.subscribe((thread:Thread) => {
          this.currentThread = thread;
        });

        this.userService.currentUser.subscribe((user:User) => {
          this.currentUser = user;
        })

        // this.messages.subscribe((message:Message) => {
        //   setTimeout(() => {
        //     this.scrollToBottom();
        //   })
        // })

        this.messageService.newMessages.subscribe((message:Message) => {
          if(message?.thread?.id === this.currentThread?.id){
            setTimeout(() => {
              this.scrollToBottom();
            })
          }
        })

      }

  ngOnInit(): void {
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messageService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector(
      '.msg-container-base'
    );
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
