import { Component, OnInit } from '@angular/core';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  messages: Message[];

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.messages = [];
  }

  ngOnInit(): void {
    this.testMessageService();
  }

  testMessageService() {
    const user: User = new User('Nate', '');
    const thread: Thread = new Thread('t1', 'Nate', '');
    const m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread,
    });

    const m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread,
    });

    // listen to each message indivdually as it comes in
    this.messageService.newMessages.subscribe((message: Message) => {
      console.log('=> new message: ' + message.text);
    });

    // listen to the stream of most current messages
    this.messageService.messages.subscribe((messages: Message[]) => {
      console.log('=> messages count: ' + messages.length);
      this.messages = [...messages];
    });

    this.messageService.addMessage(m1);
    this.messageService.addMessage(m2);

    this.messageService.create.next(new Message({text:'test create'}));
    
    this.messageService.updates.next((messages) => {
      return messages.filter((m) => m.text !== 'Hi!');
    });
  }
}
