import { TestBed } from '@angular/core/testing';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Message } from './message.model';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    messageService = TestBed.inject(MessageService);
  });

  it('custom test', () => {
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
    messageService.newMessages.subscribe((message: Message) => {
      console.log('=> new message: ' + message.text);
    });

    // listen to the stream of most current messages
    messageService.messages.subscribe((messages: Message[]) => {
      console.log('=> messages count: ' + messages.length);
    });

    messageService.addMessage(m1);
    messageService.addMessage(m2);

    messageService.create.next(new Message({text:'test create'}));
    
    messageService.updates.next((messages) => {
      return messages.filter((m) => m.text !== 'Hi!');
    });
  });
});
