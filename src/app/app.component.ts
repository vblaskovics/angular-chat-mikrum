import { Component } from '@angular/core';
import { ChatExampleData } from './data/chat-example-data';
import { MessageService } from './message/message.service';
import { UnreadMessagesService } from './message/unread-messages.service';
import { ThreadService } from './thread/thread.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-chat';

  constructor(public messageService: MessageService,
    public threadService: ThreadService,
    public userService: UserService,
    public unreadMessageService: UnreadMessagesService) {
      ChatExampleData.init(messageService, threadService, userService, unreadMessageService);
  }
}
