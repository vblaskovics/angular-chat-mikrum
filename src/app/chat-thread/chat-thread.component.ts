import { Component, Input, OnInit } from '@angular/core';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  selected: boolean = false;

  constructor(public threadService: ThreadService) {}

  ngOnInit(): void {
    this.threadService.currentThread.subscribe((currentThread: Thread) => {
      this.selected = currentThread?.id === this.thread?.id;
    });
  }

  clicked(event: any): void {
    this.threadService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
