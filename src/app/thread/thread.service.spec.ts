import { TestBed } from '@angular/core/testing';

import { ThreadService } from './thread.service';

describe('ThreadService', () => {
  let threadService: ThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    threadService = TestBed.inject(ThreadService);
  });

  it('should be created', () => {
    // TODO convert to unit test (add expects...)

    // const nate: User = new User("Nate Murray", "");
    // const felipe: User = new User("Felipe Coury", "");

    // const t1: Thread = new Thread("t1", "Thread 1", "");
    // const t2: Thread = new Thread("t2", "Thread 2", "");

    // const m1: Message = new Message({
    //   author: nate,
    //   text: "Hi!",
    //   thread: t1,
    // });

    // const m2: Message = new Message({
    //   author: felipe,
    //   text: "Where did you get that hat?",
    //   thread: t1,
    // });

    // this.threadService.threads.subscribe((thrdIdx: {[k:string]:Thread})=>{
    //   const threads: Thread[] = Object.values(thrdIdx);
    //   const threadNames: string = threads.map((t:Thread) => t.name).join(", ");
    //   console.log(`=> threads length:${threads.length} names: ${threadNames}`)
    // })

    // this.threadService.orderedThreads.subscribe((threads: Thread[]) => {
    //   this.orderedThreads = threads;
    // })

    // this.messageService.addMessage(m1);
    // this.messageService.addMessage(m2);

    // setTimeout(() => {
    //   const m3: Message = new Message({
    //     author: nate,
    //     text: "This is the 3rd",
    //     thread: t2
    //   })
    //   this.messageService.addMessage(m3);
    // }, 2000)
  });
});
