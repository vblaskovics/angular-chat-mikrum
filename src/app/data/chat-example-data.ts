/* tslint:disable:max-line-length */
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { ThreadService } from '../thread/thread.service';
import { UserService } from '../user/user.service';
import * as moment from 'moment';
import { combineLatest, withLatestFrom } from 'rxjs/operators';
import { UnreadMessagesService } from '../message/unread-messages.service';

// the person using the app us Juliet
const me: User = new User(
  'Juliet',
  'assets/images/avatars/female-avatar-1.png'
);
const ladycap: User = new User(
  'Lady Capulet',
  'assets/images/avatars/female-avatar-2.png'
);
const echo: User = new User(
  'Echo Bot',
  'assets/images/avatars/male-avatar-1.png'
);
const rev: User = new User(
  'Reverse Bot',
  'assets/images/avatars/female-avatar-4.png'
);
const wait: User = new User(
  'Waiting Bot',
  'assets/images/avatars/male-avatar-2.png'
);
const ask: User = new User(
  'Asking Bot',
  'assets/images/avatars/male-avatar-3.png'
);
const order: User = new User(
  'Order Bot',
  'assets/images/avatars/female-avatar-3.png'
);

const tLadycap: Thread = new Thread(
  'tLadycap',
  ladycap.name,
  ladycap.avatarSrc
);
const tEcho: Thread = new Thread('tEcho', echo.name, echo.avatarSrc);
const tRev: Thread = new Thread('tRev', rev.name, rev.avatarSrc);
const tWait: Thread = new Thread('tWait', wait.name, wait.avatarSrc);
const tAsk: Thread = new Thread('tAsk', ask.name, ask.avatarSrc);
const tOrder: Thread = new Thread('tOrder', order.name, order.avatarSrc);

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap,
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap,
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho,
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev,
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait,
  }),
  new Message({
    author: ask,
    sentAt: moment().subtract(5, 'minutes').toDate(),
    text: `I\'ll ask why.`,
    thread: tAsk,
  }),
  new Message({
    author: order,
    sentAt: moment().subtract(6, 'minutes').toDate(),
    text: `I\'ll recieve orders.`,
    thread: tOrder,
  }),
];

export class ChatExampleData {
  static init(
    MessageService: MessageService,
    ThreadService: ThreadService,
    UserService: UserService,
    UnreadMessagesService: UnreadMessagesService
  ): void {
    // TODO make `messages` hot
    MessageService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    UserService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map((message: Message) =>
      MessageService.addMessage(message)
    );

    ThreadService.setCurrentThread(tEcho);

    this.setupBots(MessageService, UnreadMessagesService);
  }

  static setupBots(MessageService: MessageService,
    UnreadMessagesService: UnreadMessagesService): void {
    // echo bot
    MessageService
      .messagesForThreadUser(tEcho, echo)
      .forEach((message: Message): void => {
        MessageService.addMessage(
          new Message({
            author: echo,
            text: message.text,
            thread: tEcho,
          })
        );
      });

    // reverse bot
    MessageService
      .messagesForThreadUser(tRev, rev)
      .forEach((message: Message): void => {
        MessageService.addMessage(
          new Message({
            author: rev,
            text: message.text.split('').reverse().join(''),
            thread: tRev,
          })
        );
      });

    // waiting bot
    MessageService
      .messagesForThreadUser(tWait, wait)
      .forEach((message: Message): void => {
        let waitTime: number = parseInt(message.text, 10);
        let reply: string;

        if (isNaN(waitTime)) {
          waitTime = 0;
          reply = `I didn\'t understand ${message.text}. Try sending me a number`;
        } else {
          reply = `I waited ${waitTime} seconds to send you this.`;
        }

        setTimeout(() => {
          MessageService.addMessage(
            new Message({
              author: wait,
              text: reply,
              thread: tWait,
            })
          );
        }, waitTime * 1000);
      });

    // asking bot
    MessageService
    .messagesForThreadUser(tAsk, ask)
    .forEach((message: Message): void => {
      MessageService.addMessage(
        new Message({
          author: ask,
          text: `Why ${message.text}?`,
          thread: tAsk,
        })
      );
    });

    // order bot
    MessageService.messagesForThreadUser(tOrder, order).pipe(
      withLatestFrom(UnreadMessagesService.unreadMessagesCounter)
    ).forEach(([message, count]): void => {
      let msgTxt:string;
      if(message.text === 'olvasatlan'){
        msgTxt = count;
      } else {
        msgTxt = 'Give me proper order!'
      }
      MessageService.addMessage(
        new Message({
          author: order,
          text: msgTxt,
          thread: tOrder,
        })
      );
    });

  }
}
