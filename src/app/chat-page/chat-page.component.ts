import { Component, OnInit } from '@angular/core';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/thread.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  messages: Message[];
  orderedThreads: Thread[];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private threadService: ThreadService
  ) {
  }

  ngOnInit(): void {
    

  }

}
