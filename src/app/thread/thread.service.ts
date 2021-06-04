import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { Thread } from './thread.model';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  currentThreadMessages: Observable<Message[]>;

  constructor(public messageService: MessageService) {
    this.threads = messageService.messages.pipe(
      map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};

        messages.map((message: Message) => {
          threads[message.thread.id] =
            threads[message.thread.id] || message.thread;

          const messagesThread: Thread = threads[message.thread.id];
          if (
            !messagesThread.lastMessage ||
            messagesThread.lastMessage.sentAt < message.sentAt
          ) {
            messagesThread.lastMessage = message;
          }
        });

        return threads;
      })
    );

    this.orderedThreads = this.threads.pipe(
      map((threadsObj: { [kes: string]: Thread }) => {
        const threads: Thread[] = Object.values(threadsObj);
        return threads.sort((t1: Thread, t2: Thread) => {
          const t1time: number = t1?.lastMessage?.sentAt.getTime() || 0;
          const t2time: number = t2?.lastMessage?.sentAt.getTime() || 0;
          return t2time - t1time;
        });
      })
    );

    this.currentThread.subscribe(this.messageService.markThreadAsRead);

    this.currentThreadMessages = combineLatest([
      this.currentThread,
      messageService.messages,
    ]).pipe(
      map(([currentThread, messages]) => {
        if (currentThread && messages.length > 0) {
          return messages
            .filter(
              (message) => message.thread.id === currentThread.id)
            .map((message:Message) => {
              message.isRead = true;
              return message;
            });
        } else {
          return [];
        }
      })
    );
  }
}
